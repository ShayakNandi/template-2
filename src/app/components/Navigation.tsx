import Link from 'next/link';

const Navigation = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link href="/chat">Chat</Link>
        </li>
        {/* Add other navigation links here */}
      </ul>
    </nav>
  );
};

export default Navigation;
