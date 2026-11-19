import { UploadCloud } from 'lucide-react'

export default function NewInspection() {
  return <><div className="page-heading"><div><p className="eyebrow">CREATE</p><h1>New Inspection</h1></div></div><section className="panel upload-page"><div className="upload-zone"><UploadCloud size={38}/><h2>Upload product image</h2><p>Drag and drop JPG, PNG, or TIFF files here</p><button className="primary-button">Choose Files</button></div></section></>
}
