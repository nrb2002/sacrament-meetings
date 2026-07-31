// components/Header.tsx

export default function Footer() {
  return (
    <footer className="border-t bg-white py-6">
      <div className="mx-auto max-w-6xl px-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Sacrament Meetings | Kasa-Vubu
        Ward/Kinshasa Stake - Democratic Republic of Congo
      </div>
      <div className="mx-auto max-w-6xl px-6 text-center text-sm text-gray-500">
        <p>
          Crafted with ❤️ by
          <a
            href="https://www.linkedin.com/in/mobby2022/"
            target="_blank"
            rel="noopener noreferrer"
          >
            {" "}
            Baron Tshibasu
          </a>
        </p>
      </div>
    </footer>
  );
}
