// import Contact from "../models/Contact.js";

// // Create Contact
// export const createContact = async (req, res) => {
//   try {
//     console.log("📩 Contact Request:", req.body);

//     const { name, email, phone, service, message } = req.body;

//     // Validation
//     if (!name || !email || !service || !message) {
//       return res.status(400).json({
//         success: false,
//         message: "Please fill all required fields",
//       });
//     }

//     const contact = await Contact.create({
//       name,
//       email,
//       phone,
//       service,
//       message,
//     });

//     console.log("✅ Contact Saved:", contact._id);

//     return res.status(201).json({
//       success: true,
//       message: "Contact form submitted successfully",
//       data: contact,
//     });
//   } catch (error) {
//     console.error("❌ Contact Create Error:", error);

//     return res.status(500).json({
//       success: false,
//       message: "Internal Server Error",
//       error: error.message,
//     });
//   }
// };

// // Get All Contacts
// export const getContacts = async (req, res) => {
//   try {
//     const contacts = await Contact.find().sort({ createdAt: -1 });

//     return res.status(200).json({
//       success: true,
//       count: contacts.length,
//       data: contacts,
//     });
//   } catch (error) {
//     console.error("❌ Get Contacts Error:", error);

//     return res.status(500).json({
//       success: false,
//       message: "Internal Server Error",
//       error: error.message,
//     });
//   }
// };

// // Get Single Contact
// export const getContactById = async (req, res) => {
//   try {
//     const contact = await Contact.findById(req.params.id);

//     if (!contact) {
//       return res.status(404).json({
//         success: false,
//         message: "Contact not found",
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       data: contact,
//     });
//   } catch (error) {
//     console.error("❌ Get Contact Error:", error);

//     return res.status(500).json({
//       success: false,
//       message: "Internal Server Error",
//       error: error.message,
//     });
//   }
// };

// // Delete Contact
// export const deleteContact = async (req, res) => {
//   try {
//     const contact = await Contact.findByIdAndDelete(req.params.id);

//     if (!contact) {
//       return res.status(404).json({
//         success: false,
//         message: "Contact not found",
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       message: "Contact deleted successfully",
//     });
//   } catch (error) {
//     console.error("❌ Delete Contact Error:", error);

//     return res.status(500).json({
//       success: false,
//       message: "Internal Server Error",
//       error: error.message,
//     });
//   }
// };
import Contact from "../models/Contact.js";

// ✅ Create Contact (Public)
export const createContact = async (req, res) => {
  try {
    console.log("📩 Contact Request:", req.body);

    const { name, email, phone, service, message } = req.body;

    // Validation
    if (!name || !email || !service || !message) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    const contact = await Contact.create({
      name,
      email,
      phone,
      service,
      message,
    });

    console.log("✅ Contact Saved:", contact._id);

    return res.status(201).json({
      success: true,
      message: "Contact form submitted successfully",
      data: contact,
    });
  } catch (error) {
    console.error("❌ Contact Create Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// ✅ Get All Contacts (Admin Only)
export const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts,
    });
  } catch (error) {
    console.error("❌ Get Contacts Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// ✅ Get Single Contact (Admin Only)
export const getContactById = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: contact,
    });
  } catch (error) {
    console.error("❌ Get Contact Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// ✅ Update Contact (Admin Only)
export const updateContact = async (req, res) => {
  try {
    const { name, email, phone, service, message } = req.body;
    
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact not found",
      });
    }

    contact.name = name || contact.name;
    contact.email = email || contact.email;
    contact.phone = phone || contact.phone;
    contact.service = service || contact.service;
    contact.message = message || contact.message;

    await contact.save();

    console.log("✅ Contact Updated:", contact._id);

    return res.status(200).json({
      success: true,
      message: "Contact updated successfully",
      data: contact,
    });
  } catch (error) {
    console.error("❌ Update Contact Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// ✅ Delete Contact (Admin Only)
export const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact not found",
      });
    }

    console.log("✅ Contact Deleted:", contact._id);

    return res.status(200).json({
      success: true,
      message: "Contact deleted successfully",
    });
  } catch (error) {
    console.error("❌ Delete Contact Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};