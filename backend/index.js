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
const port = process.env.PORT || 5000;
const bucket = require("./config/firebase.js");
// mongo db connect function
dbconnect();


// Configure CORS
const corsOptions = {
  origin: "https://sleekstyle.onrender.com", // Replace with your frontend URL
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // Enable cookies and authorization headers
  optionsSuccessStatus: 204, // Some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));
// Set up Multer for file upload
const upload = multer({ storage: multer.memoryStorage() });

app.use(cors({ origin: "https://sleekstyle.onrender.com", credentials: true }));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "16mb", extended: true })); // Make sure you add these two lines
app.use(bodyParser.urlencoded({ limit: "16mb", extended: true }));
app.use(cookieParser());

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the backend API");
});

app.post("/uploads", upload.single("image"), async (req, res) => {
  const { productName, description, price, quantity, category } = req.body;
  try {
    if (!req.file) {
      return res.status(400).send("No file uploaded");
    }

    // Create a reference to the Firebase storage file
    const fileName = Date.now() + req.file.originalname;
    const blob = bucket.file(fileName);

    // Create a write stream to upload the image to Firebase
    const blobStream = blob.createWriteStream({
      metadata: {
        contentType: req.file.mimetype,
      },
    });

    blobStream.on("error", (err) => {
      res.status(500).send({ error: "Error uploading file to Firebase", err });
    });

    blobStream.on("finish", async () => {
      // Public URL for the uploaded file
      await blob.makePublic();

      // Public URL for the uploaded file
      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;

      // Save product details to MongoDB
      const product = new Product({
        productName,
        image: publicUrl,
        description,
        price,
        quantity,
        category,
      });

      await product.save();
      res
        .status(201)
        .send({ message: "Product created successfully", product });
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
    // Check if the product exists in the database
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }

    // Handle the file upload if a new image is provided
    if (req.file) {
      // Create a reference to the Firebase storage file
      const fileName = Date.now() + req.file.originalname;
      const blob = bucket.file(fileName);

      // Create a write stream to upload the image to Firebase
      const blobStream = blob.createWriteStream({
        metadata: {
          contentType: req.file.mimetype,
        },
      });

      blobStream.on("error", (err) => {
        return res
          .status(500)
          .send({ error: "Error uploading file to Firebase", err });
      });

      blobStream.on("finish", async () => {
        // Make the uploaded file publicly accessible
        await blob.makePublic();

        // Public URL for the uploaded file
        const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;

        // Update the product details along with the new image URL
        product.productName = productName || product.productName;
        product.description = description || product.description;
        product.price = price || product.price;
        product.quantity = quantity || product.quantity;
        product.category = category || product.category;
        product.image = publicUrl; // Update with the new image URL

        await product.save();
        return res
          .status(200)
          .send({ message: "Product updated successfully", product });
      });

      blobStream.end(req.file.buffer);
    } else {
      // If no new image is provided, update only the text fields
      product.productName = productName || product.productName;
      product.description = description || product.description;
      product.price = price || product.price;
      product.quantity = quantity || product.quantity;
      product.category = category || product.category;

      await product.save();
      return res
        .status(200)
        .send({ message: "Product updated successfully", product });
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
app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
