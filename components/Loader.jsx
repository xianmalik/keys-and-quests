export default function Loader({ isLoading, children }) {
  return isLoading ? (
    <div className="mx-auto my-8 w-8 h-8 border-4 border-gray-500 border-solid rounded-full border-t-transparent animate-spin"></div>
  ) : children
}