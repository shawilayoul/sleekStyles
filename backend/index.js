const dotenv = require("dotenv").config();
const cors = require("cors");
const express = require("express");
const multer = require("multer");
const bodyParser = require("body-parser");
const dbconnect = require("./config/db.js");
const path = require("path");
const Product = require("./models/productsModel.js");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const app = express();
const port = process.env.PORT || 7000;
const bucket = require("./config/firebase.js");

// MongoDB connect function
dbconnect();

// Set up Multer for file upload
const upload = multer({ storage: multer.memoryStorage() });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "16mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "16mb", extended: true }));
app.use(cookieParser());
app.use(express.json());

// Middleware to set correct MIME type for .jsx files
app.use((req, res, next) => {
  if (req.url.endsWith('.jsx')) {
    res.setHeader('Content-Type', 'application/javascript');
  }
  next();
});

app.post("/uploads", upload.single("image"), async (req, res) => {
  const { productName, description, price, quantity, category } = req.body;
  try {
    if (!req.file) {
      return res.status(400).send("No file uploaded");
    }

    const fileName = Date.now() + req.file.originalname;
    const blob = bucket.file(fileName);

    const blobStream = blob.createWriteStream({
      metadata: {
        contentType: req.file.mimetype,
      },
    });

    blobStream.on("error", (err) => {
      res.status(500).send({ error: "Error uploading file to Firebase", err });
    });

    blobStream.on("finish", async () => {
      await blob.makePublic();
      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;

      const product = new Product({
        productName,
        image: publicUrl,
        description,
        price,
        quantity,
        category,
      });

      await product.save();
      res.status(201).send({ message: "Product created successfully", product });
    });

    blobStream.end(req.file.buffer);
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).send("Internal server error");
  }
});

app.put("/uploads/:_id", upload.single("image"), async (req, res) => {
  const productId = req.params._id;
  const { productName, description, price, quantity, category } = req.body;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }

    if (req.file) {
      const fileName = Date.now() + req.file.originalname;
      const blob = bucket.file(fileName);

      const blobStream = blob.createWriteStream({
        metadata: {
          contentType: req.file.mimetype,
        },
      });

      blobStream.on("error", (err) => {
        return res.status(500).send({ error: "Error uploading file to Firebase", err });
      });

      blobStream.on("finish", async () => {
        await blob.makePublic();
        const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;

        product.productName = productName || product.productName;
        product.description = description || product.description;
        product.price = price || product.price;
        product.quantity = quantity || product.quantity;
        product.category = category || product.category;
        product.image = publicUrl;

        await product.save();
        return res.status(200).send({ message: "Product updated successfully", product });
      });

      blobStream.end(req.file.buffer);
    } else {
      product.productName = productName || product.productName;
      product.description = description || product.description;
      product.price = price || product.price;
      product.quantity = quantity || product.quantity;
      product.category = category || product.category;

      await product.save();
      return res.status(200).send({ message: "Product updated successfully", product });
    }
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).send("Internal server error");
  }
});

// Serve static files from 'uploads' directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/create-checkout", require("./routes/stripeRoute.js"));
app.use("/api/products", require("./routes/productsRoute.js"));
app.use("/api/auth", require("./routes/authRoute.js"));

// All other GET requests not handled before will return the React app
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, '../frontend/dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
  });
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});