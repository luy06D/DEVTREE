
type ErrorMsjProp = {
    children: React.ReactNode
}

export default function ErrorMessage({children} : ErrorMsjProp) {
  return (
      <div 
      className="text-red-600 bg-red-50 text-sm uppercase p-3 font-bold text-center"
      >{children}</div>
  )
}
