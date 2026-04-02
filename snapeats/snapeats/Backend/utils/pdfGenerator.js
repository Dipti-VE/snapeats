import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const generateInvoice = (order) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument();

      const filePath = path.join(
        __dirname,
        `../invoices/invoice_${Date.now()}.pdf`
      );

      const stream = fs.createWriteStream(filePath);
      doc.pipe(stream);

      // Title
      doc.fontSize(20).text("Order Invoice", { align: "center" });
      doc.moveDown();

      // Order Details
      doc.fontSize(12).text(`Order ID: ${order.orderId || "N/A"}`);
      doc.text(`Payment ID: ${order.paymentId || "N/A"}`);
      doc.text(`Date: ${new Date().toLocaleString()}`);
      doc.moveDown();

      // Items
      doc.fontSize(14).text("Items:");
      doc.moveDown();

      if (order.items && order.items.length > 0) {
        order.items.forEach((item, index) => {
          doc.text(
            `${index + 1}. ${item.name || "Item"} | Qty: ${item.quantity || 1} | ₹${item.price || 0}`
          );
        });
      } else {
        doc.text("No items found");
      }

      doc.moveDown();

      // User Details
      doc.fontSize(14).text("Delivery Details:");
      doc.moveDown();

      doc.text(`Name: ${order.userDetails?.name || "N/A"}`);
      doc.text(`Phone: ${order.userDetails?.phone || "N/A"}`);
      doc.text(`Email: ${order.userDetails?.email || "N/A"}`);
      doc.text(`Address: ${order.userDetails?.address || "N/A"}`);

      doc.moveDown();

      // Total
      doc.fontSize(16).text(`Total Paid: ₹${order.totalAmount || 0}`, {
        align: "right",
      });

      doc.end();

      stream.on("finish", () => {
        console.log("PDF fully generated");
        resolve(filePath);
      });

      stream.on("error", (err) => reject(err));

    } catch (err) {
      reject(err);
    }
  });
};

export default generateInvoice;