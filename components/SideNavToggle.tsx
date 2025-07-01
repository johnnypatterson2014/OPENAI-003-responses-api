'use client';

export default function SideNavToggle() {

  const handleClick = () => {
    const toggleButton = document.getElementById('toggle-btn');
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('close');
    toggleButton.classList.toggle('rotate')
  };

  return (
    <>

      <div id="toggle-btn"
        className="btn btn-sm bg-zinc-800 hover:bg-zinc-100 border border-zinc-600 text-zinc-200 hover:text-zinc-900"
        onClick={handleClick}
      >
        <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#e8eaed"><path d="m313-480 155 156q11 11 11.5 27.5T468-268q-11 11-28 11t-28-11L228-452q-6-6-8.5-13t-2.5-15q0-8 2.5-15t8.5-13l184-184q11-11 27.5-11.5T468-692q11 11 11 28t-11 28L313-480Zm264 0 155 156q11 11 11.5 27.5T732-268q-11 11-28 11t-28-11L492-452q-6-6-8.5-13t-2.5-15q0-8 2.5-15t8.5-13l184-184q11-11 27.5-11.5T732-692q11 11 11 28t-11 28L577-480Z" /></svg>
      </div>

    </>
  );
}
