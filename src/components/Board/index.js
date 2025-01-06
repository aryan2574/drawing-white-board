import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

const Board = () => {
    const canvasRef = useRef(null);
    const shouldDraw = useRef(false);

    const activeMenuItem = useSelector((state) => state.menu.activeMenuItem);
    const { color, size } = useSelector((state) => state.toolbox[activeMenuItem]);

    useEffect(() => {
        if (!canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");


        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const handleMouseDown = (e) => {
            shouldDraw.current = true;

            ctx.beginPath();
            ctx.moveTo(e.clientX, e.clientY);
        }

        const handleMouseMove = (e) => {
            if (!shouldDraw.current) return;

            ctx.lineTo(e.clientX, e.clientY);
            ctx.stroke();
        }

        const handleMouseUp = () => {
            shouldDraw.current = false;

            ctx.closePath();
        }

        canvas.addEventListener("mousedown", handleMouseDown);
        canvas.addEventListener("mousemove", handleMouseMove);
        canvas.addEventListener("mouseup", handleMouseUp);

        return () => {
            canvas.removeEventListener("mousedown", handleMouseDown);
            canvas.removeEventListener("mousemove", handleMouseMove);
            canvas.removeEventListener("mouseup", handleMouseUp);
        }
    }, []);

    useEffect(() => {
        if (!canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        const changeConfig = () => {
            ctx.strokeStyle = color;
            ctx.lineWidth = size;
        }

        changeConfig();
    }, [color, size]);

    return (
        <canvas ref={canvasRef} width={800} height={800} />
    );
};

export default Board;