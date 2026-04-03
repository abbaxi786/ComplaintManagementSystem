
function Message({message,func,indicator}) {
    let colorNo=[
        "bg-emerald-500/80 border-2 font-bold border-emerald-800",
        "bg-red-500/80 border-2 font-bold border-red-600",
        "bg-amber-400/80 border-2 font-bold border-amber-600",
    ];
        setTimeout(() => {
            func();
        }, 2000);
  return (
    <div className={`absolute bottom-3  ${colorNo[indicator]} right-3 showUp text-white  rounded-md px-5 py-2 `}>{message}</div>
  )
}

export default Message;