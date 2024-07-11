import React, { useState, useEffect } from 'react';

const Settings = () => {
    const [bgColor, setBgColor] = useState<string>('#235552');
    const [tempColor, setTempColor] = useState<string>(bgColor);
    const [colorHistory, setColorHistory] = useState<string[]>([]);

    useEffect(() => {
        // Load color history from localStorage
        const savedColors = localStorage.getItem('colorHistory');
        if (savedColors) {
            const parsedColors = JSON.parse(savedColors);
            setColorHistory(parsedColors);
            // Set the initial background color to the last color in the history
            if (parsedColors.length > 0) {
                setBgColor(parsedColors[parsedColors.length - 1]);
            }
        }
    }, []);

    useEffect(() => {
        // Save color history to localStorage
        localStorage.setItem('colorHistory', JSON.stringify(colorHistory));
        // Update bgColor in localStorage when it changes
        localStorage.setItem('bgColor', bgColor);
    }, [colorHistory, bgColor]);

    const handleColorInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTempColor(e.target.value);
    };

    const handleColorChange = () => {
        const newColor = tempColor;
        setBgColor(newColor);
        // Add the new color to colorHistory if it's not already there
        if (!colorHistory.includes(newColor)) {
            setColorHistory([...colorHistory, newColor]);
        }
    };

    const handleColorSelect = (color: string) => {
        setBgColor(color);
        // Update colorHistory to reflect the selected color
        setColorHistory([...colorHistory.filter(c => c !== color), color]);
    };

    return (
        <section className="container mt-20 px-4 mx-auto">
            <h1 className="text-2xl font-bold mb-6">Settings</h1>
            <div className="mb-8">
                <label htmlFor="bgColor" className="block text-lg font-medium text-gray-700 mb-2">
                    Select Background Color:
                </label>
                <input
                    type="color"
                    id="bgColor"
                    value={tempColor}
                    onInput={handleColorInput}
                    onBlur={handleColorChange}
                    className="w-16 h-16 p-1 border-2 border-gray-300 rounded-full shadow-md transition duration-300 ease-in-out transform hover:scale-110"
                />
            </div>
            <div className="mb-8">
                <h2 className="text-lg font-medium text-gray-700 mb-4">Previously Selected Colors:</h2>
                <div className="flex flex-wrap gap-2">
                    {colorHistory.map((color, index) => (
                        <button
                            key={index}
                            className="w-10 h-10 rounded-full border-2 border-gray-300 shadow-md transition duration-300 ease-in-out transform hover:scale-110"
                            style={{ backgroundColor: color }}
                            onClick={() => handleColorSelect(color)}
                        />
                    ))}
                </div>
            </div>
            <div className="p-6 w-full lg:w-1/3 rounded-lg shadow-lg" style={{ backgroundColor: bgColor }}>
                <div className="p-4">
                    <p className="text-lg text-white">
                        This is the background color preview area. Change the color using the picker above.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Settings;
