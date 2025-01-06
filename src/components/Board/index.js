import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

const Board = () => {
    const canvasRef = useRef(null);
    const activeMenuItem = useSelector((state) => state.menu.activeMenuItem);
    const { color, size } = useSelector((state) => state.toolbox[activeMenuItem]);

    useEffect(() => {
        if (!canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");


        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }, []);

    console.log(color, size);

    return (
        <canvas ref={canvasRef} width={800} height={800} />
    );
};

export default Board;