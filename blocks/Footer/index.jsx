import Socials from "@/components/Socials";

export default function Footer() {
  return (
    <footer className="border-t-4 border-black bg-cream p-6">
      <div className="max-w-screen-xl mx-auto text-center">
        <div className="mx-auto mb-4">
          <p className="text-gray-600 mb-2">Follow me on socials:</p>
          <Socials />
        </div>
        <p className="text-xs tracking-wider text-center flex-1 text-gray-400 font-light">
          All rights reserved! Keys & Quests
        </p>
      </div>
    </footer>
  );
}
