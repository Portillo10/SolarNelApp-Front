export default function CardHoles({ px, py, size }) {
  return (
    <div className={`flex flex-row justify-around py-${py} px-${px}`}>
      <figure
        style={{ width: size, height: size }}
        className="rounded-full shadow-inner shadow-slate-500 bg-[#F5F5F5] dark:bg-[#111111] dark:shadow-none dark:border-[#898788]"
      ></figure>
      <figure
        style={{ width: size, height: size }}
        className="rounded-full shadow-inner shadow-slate-500 bg-[#F5F5F5] dark:bg-[#111111] dark:shadow-none dark:border-[#898788]"
      ></figure>
      <figure
        style={{ width: size, height: size }}
        className="rounded-full shadow-inner shadow-slate-500 bg-[#F5F5F5] dark:bg-[#111111] dark:shadow-none dark:border-[#898788]"
      ></figure>
      <figure
        style={{ width: size, height: size }}
        className="rounded-full shadow-inner shadow-slate-500 bg-[#F5F5F5] dark:bg-[#111111] dark:shadow-none dark:border-[#898788]"
      ></figure>
      <figure
        style={{ width: size, height: size }}
        className="rounded-full shadow-inner shadow-slate-500 bg-[#F5F5F5] dark:bg-[#111111] dark:shadow-none dark:border-[#898788]"
      ></figure>
    </div>
  );
}
