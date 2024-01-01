// components/Footer.jsx
export default function Footer() {
  return (
    <footer className="bg-gray-800 p-4 mt-10">
      <div className="container mx-auto text-center text-white">
        &copy; {new Date().getFullYear()} School Management System
      </div>
    </footer>
  );
}
