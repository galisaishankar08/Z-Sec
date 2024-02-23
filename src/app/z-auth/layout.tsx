
export default function Layout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
  return (
    <div className={`m-5 grid grid-flow-col justify-center items-center`}>
    <div className={`bg-[#FFFCF2] p-5 w-fit h-fit rounded-xl shadow font-Elsie `}>
        <h2 className={`text-transparent bg-clip-text text-center bg-gradient-to-b from-secondary to-primary text-6xl font-black font-Elsie`}>Z-Auth</h2>
        {children}
    </div>  
</div>
  )
}