export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="min-h-full flex flex-col">{children}</div>
}
