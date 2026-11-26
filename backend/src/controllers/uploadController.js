
import fs from 'fs/promises'
import path from 'path'

export const uploadProductImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Please upload an image.',
      })
    }

    return res.status(201).json({
      success: true,
      message: 'Image uploaded successfully.',
      file: {
        filename: req.file.filename,
        originalName: req.file.originalname,
        mimeType: req.file.mimetype,
        size: req.file.size,
        imagePath: `uploads/${req.file.filename}`,
      },
    })
  } catch (error) {
    // Remove the saved file if a later operation fails.
    if (req.file?.path) {
      await fs.unlink(req.file.path).catch(() => {})
    }

    console.error('Image upload error:', error)

    return res.status(500).json({
      success: false,
      message: 'Image upload failed.',
    })
  }
}
