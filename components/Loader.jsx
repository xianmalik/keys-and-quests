export default function Loader({ isLoading, children }) {
  return isLoading ? (
    <div className="mx-auto my-auto w-10 h-10 border-2 border-slate-800 border-solid rounded-full border-t-transparent animate-spin"></div>
  ) : children
}