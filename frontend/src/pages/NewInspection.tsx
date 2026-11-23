
import { useEffect, useState, type SubmitEvent, type DragEvent } from 'react'
import {
  Upload,
  Image as ImageIcon,
  X,
  ScanSearch,
  RotateCcw,
  CheckCircle,
  AlertTriangle,
  LoaderCircle,
} from 'lucide-react'

// 1. Define the inspection result structure
interface InspectionResult {
  productName: string
  batchNumber: string
  material: string
  defectCount: number
  status: 'Passed' | 'Failed' | 'Review'
}

function NewInspection() {
  // 2. Form states
  const [productName, setProductName] = useState('')
  const [batchNumber, setBatchNumber] = useState('')
  const [material, setMaterial] = useState('Steel')

  // 3. Image states
  const [image, setImage] = useState<File | null>(null)
  const [preview, setPreview] = useState('')

  // 4. UI states
  const [error, setError] = useState('')
  const [isDragging, setIsDragging] = useState(false)
  const [isInspecting, setIsInspecting] = useState(false)
  const [result, setResult] = useState<InspectionResult | null>(null)

  // 5. Generate image preview
  useEffect(() => {
    if (!image) {
      setPreview('')
      return
    }

    const imageUrl = URL.createObjectURL(image)
    setPreview(imageUrl)

    return () => {
      URL.revokeObjectURL(imageUrl)
    }
  }, [image])

  // 6. Validate and select image
  const handleImageUpload = (file?: File) => {
    setError('')

    if (!file) return

    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file.')
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('Image size must be less than 5 MB.')
      return
    }

    setImage(file)
    setResult(null)
  }

  // 7. Handle drag and drop
  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setIsDragging(false)

    const file = event.dataTransfer.files[0]
    handleImageUpload(file)
  }

  // 8. Submit inspection form
  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')

    if (!productName.trim()) {
      setError('Please enter a product name.')
      return
    }

    if (!batchNumber.trim()) {
      setError('Please enter a batch number.')
      return
    }

    if (!image) {
      setError('Please upload a product image.')
      return
    }

    setIsInspecting(true)
    setResult(null)

    // Simulate AI processing for 1.5 seconds
    window.setTimeout(() => {
      const demoResult: InspectionResult = {
        productName,
        batchNumber,
        material,
        defectCount: 2,
        status: 'Review',
      }

      setResult(demoResult)
      setIsInspecting(false)
    }, 1500)
  }

  // 9. Reset the form
  const handleReset = () => {
    setProductName('')
    setBatchNumber('')
    setMaterial('Steel')
    setImage(null)
    setError('')
    setResult(null)
    setIsInspecting(false)
  }

  // 10. Render the page
  return (
    <div className="space-y-6">

      {/* Page heading */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          New Inspection
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Upload a product image to start quality inspection.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid gap-6 lg:grid-cols-2"
      >

        {/* Product information */}
        <section className="rounded-xl border border-slate-200 bg-white p-6">
          <h2 className="mb-5 text-lg font-semibold text-slate-900">
            Product Information
          </h2>

          <div className="space-y-4">

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Product Name
              </label>

              <input
                type="text"
                value={productName}
                onChange={(event) => setProductName(event.target.value)}
                placeholder="e.g. Metal Sheet A"
                className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Batch Number
              </label>

              <input
                type="text"
                value={batchNumber}
                onChange={(event) => setBatchNumber(event.target.value)}
                placeholder="e.g. BATCH-001"
                className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Material Type
              </label>

              <select
                value={material}
                onChange={(event) => setMaterial(event.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2"
              >
                <option value="Steel">Steel</option>
                <option value="Aluminium">Aluminium</option>
                <option value="Iron">Iron</option>
                <option value="Other">Other</option>
              </select>
            </div>

          </div>
        </section>

        {/* Image upload section */}
        <section className="rounded-xl border border-slate-200 bg-white p-6">
          <h2 className="mb-5 text-lg font-semibold text-slate-900">
            Product Image
          </h2>

          <div
            onDragOver={(event) => {
              event.preventDefault()
              setIsDragging(true)
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            className={`flex min-h-64 flex-col items-center justify-center rounded-xl border-2 border-dashed p-5 text-center ${
              isDragging
                ? 'border-blue-500 bg-blue-50'
                : 'border-slate-300 bg-slate-50'
            }`}
          >

            {preview ? (
              <div className="w-full">

                <img
                  src={preview}
                  alt="Selected product"
                  className="mx-auto max-h-48 rounded-lg object-contain"
                />

                <p className="mt-3 break-all text-sm text-slate-600">
                  {image?.name}
                </p>

                <button
                  type="button"
                  onClick={() => setImage(null)}
                  className="mt-3 inline-flex items-center gap-2 text-sm text-red-600"
                >
                  <X size={16} />
                  Remove Image
                </button>

              </div>
            ) : (
              <>
                <ImageIcon size={40} className="mb-3 text-slate-400" />

                <p className="font-medium text-slate-700">
                  Drag and drop your image here
                </p>

                <p className="my-2 text-sm text-slate-500">
                  or
                </p>

                <label className="cursor-pointer rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
                  <Upload size={16} className="mr-2 inline" />
                  Browse Image

                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(event) =>
                      handleImageUpload(event.target.files?.[0])
                    }
                  />
                </label>

                <p className="mt-3 text-xs text-slate-400">
                  Images only · Maximum size 5 MB
                </p>
              </>
            )}

          </div>
        </section>

        {/* Validation error */}
        {error && (
          <div className="flex items-center gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-700 lg:col-span-2">
            <AlertTriangle size={18} />
            {error}
          </div>
        )}

        {/* Action buttons */}
        <div className="flex flex-wrap gap-3 lg:col-span-2">

          <button
            type="submit"
            disabled={isInspecting}
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white hover:bg-blue-700 disabled:opacity-60"
          >
            {isInspecting ? (
              <>
                <LoaderCircle size={18} className="animate-spin" />
                Inspecting...
              </>
            ) : (
              <>
                <ScanSearch size={18} />
                Start Inspection
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleReset}
            disabled={isInspecting}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-5 py-2.5 font-medium text-slate-700 hover:bg-slate-50"
          >
            <RotateCcw size={17} />
            Reset
          </button>

        </div>

      </form>

      {/* Loading message */}
      {isInspecting && (
        <div className="rounded-xl border border-blue-200 bg-blue-50 p-5 text-blue-800">
          Processing image... Please wait.
        </div>
      )}

      {/* Inspection result */}
      {result && (
        <section className="rounded-xl border border-slate-200 bg-white p-6">

          <div className="flex items-center gap-2">
            <CheckCircle className="text-green-600" />

            <h2 className="text-lg font-semibold text-slate-900">
              Inspection Result
            </h2>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            <div className="rounded-lg bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Product</p>
              <p className="mt-1 font-semibold">{result.productName}</p>
            </div>

            <div className="rounded-lg bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Batch Number</p>
              <p className="mt-1 font-semibold">{result.batchNumber}</p>
            </div>

            <div className="rounded-lg bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Material</p>
              <p className="mt-1 font-semibold">{result.material}</p>
            </div>

            <div className="rounded-lg bg-amber-50 p-4">
              <p className="text-sm text-amber-700">Defects (Demo)</p>
              <p className="mt-1 text-xl font-bold text-amber-800">
                {result.defectCount}
              </p>
            </div>

          </div>

          <div className="mt-5 rounded-lg bg-amber-50 p-4">
            <p className="text-sm text-amber-700">Inspection Status</p>
            <p className="mt-1 font-semibold text-amber-900">
              {result.status}
            </p>
          </div>

          <p className="mt-4 text-xs text-slate-500">
            This is a simulated result. The AI model has not analyzed the image.
          </p>

        </section>
      )}

    </div>
  )
}

export default NewInspection
