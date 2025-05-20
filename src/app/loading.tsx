function loading() {
  const style = {
    width: '3rem',
    height: '3rem',
    backgroundColor: 'rgba(100,116,139,0.3)',
    margin: '1rem auto',
    animation: 'rotate 2.4s infinite ease-in-out',
  };

  const keyframes = `
    @keyframes rotate {
      0% { transform: perspective(120px) rotateX(0deg) rotateY(0deg) }
      25% { transform: perspective(120px) rotateX(-180deg) rotateY(0deg) }
      50% { transform: perspective(120px) rotateX(-180deg) rotateY(-180deg) }
      75% { transform: perspective(120px) rotateX(0deg) rotateY(-180deg) }
      100% { transform: perspective(120px) rotateX(0deg) rotateY(-360deg) }
    }
  `;

  return (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center">
      <span className="font-bold text-xl">In Progress ...</span>
      <style>{keyframes}</style>
      <div style={style}></div>
    </div>
  );
}

export default loading;
