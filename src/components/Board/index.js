import { useEffect, useRef, useLayoutEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MENU_ITEMS } from "@/constants";
import { menuItemClick, actionItemClick } from "@/slice/menuSlice";

const Board = () => {
    const dispatch = useDispatch();
    const canvasRef = useRef(null);
    const shouldDraw = useRef(false);

    const { activeMenuItem, actionMenuItem } = useSelector((state) => state.menu);
    const { color, size } = useSelector((state) => state.toolbox[activeMenuItem]);

    useEffect(() => {
        if (!canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        if (actionMenuItem === MENU_ITEMS.DOWNLOAD) {
            const URL = canvas.toDataURL("image/png");
            const acnhor = document.createElement("a");
            acnhor.href = URL;
            acnhor.download = "drawing.png";
            acnhor.click();
        }

        dispatch(actionItemClick(null));

    }, [actionMenuItem, dispatch]);

    useLayoutEffect(() => {
        if (!canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const beginPath = (x, y) => {
            ctx.beginPath();
            ctx.moveTo(x, y);
        }

        const drawLine = (x, y) => {
            ctx.lineTo(x, y);
            ctx.stroke();
        }

        const handleMouseDown = (e) => {
            shouldDraw.current = true;

            beginPath(e.clientX, e.clientY);
        }

        const handleMouseMove = (e) => {
            if (!shouldDraw.current) return;

            drawLine(e.clientX, e.clientY);
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