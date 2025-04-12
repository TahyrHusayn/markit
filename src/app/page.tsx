import { ThemeToggle } from "@/components/theme-toggle";

export default function Home() {
  return (
    <div className="h-screen w-full flex justify-center items-center text-[100px] text-[#2B9AF7]">
      <ThemeToggle />
      Welcome to Attendense System students.
    </div>
  );
}
