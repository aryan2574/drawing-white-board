import { useEffect, useRef, useLayoutEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MENU_ITEMS } from "@/constants";
import { actionItemClick } from "@/slice/menuSlice";

import { socket } from "@/socket";

const Board = () => {
    const dispatch = useDispatch();
    const canvasRef = useRef(null);
    const shouldDraw = useRef(false);

    const drawHistory = useRef([]);
    const historyPointer = useRef(-1);

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
        } else if ((actionMenuItem === MENU_ITEMS.UNDO || actionMenuItem === MENU_ITEMS.REDO) && drawHistory.current.length > 0) {
            console.log(drawHistory.current.length, historyPointer.current);

            if (historyPointer.current > 0 && actionMenuItem === MENU_ITEMS.UNDO) {
                historyPointer.current -= 1;
            }

            if (historyPointer.current < drawHistory.current.length - 1 && actionMenuItem === MENU_ITEMS.REDO) {
                historyPointer.current += 1;
            }

            const imageData = drawHistory.current[historyPointer.current];
            ctx.putImageData(imageData, 0, 0);
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

            socket.emit('beginPath', { x: e.clientX, y: e.clientY });
        }

        const handleMouseMove = (e) => {
            if (!shouldDraw.current) return;

            drawLine(e.clientX, e.clientY);

            socket.emit('drawLine', { x: e.clientX, y: e.clientY });
        }

        const handleMouseUp = () => {
            shouldDraw.current = false;
            ctx.closePath();

            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            drawHistory.current.push(imageData);
            historyPointer.current = drawHistory.current.length - 1;
        }

        const handleBeginPath = (path) => {
            beginPath(path.x, path.y);
        }

        const handleDrawLine = (path) => {
            drawLine(path.x, path.y);
        }

        canvas.addEventListener("mousedown", handleMouseDown);
        canvas.addEventListener("mousemove", handleMouseMove);
        canvas.addEventListener("mouseup", handleMouseUp);

        socket.on("beginPath", handleBeginPath);
        socket.on("drawLine", handleDrawLine);

        return () => {
            canvas.removeEventListener("mousedown", handleMouseDown);
            canvas.removeEventListener("mousemove", handleMouseMove);
            canvas.removeEventListener("mouseup", handleMouseUp);

            socket.off("beginPath", handleBeginPath);
            socket.off("drawLine", handleDrawLine);
        }
    }, []);

    useEffect(() => {
        if (!canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        const changeConfig = (color, size) => {
            ctx.strokeStyle = color;
            ctx.lineWidth = size;
        }

        const handleChangeConfig = (config) => {
            changeConfig(config.color, config.size);
        }

        changeConfig(color, size);
        socket.on("changeConfig", handleChangeConfig);

        return () => {
            socket.off("changeConfig", handleChangeConfig);
        }
    }, [color, size]);

    return (
        <canvas ref={canvasRef} width={800} height={800} />
    );
};

export default Board;