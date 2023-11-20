import React, { ReactNode } from 'react';

export const Footer = () => {
    return (
        <footer className="flex-col z-30 w-full flex items-center justify-center h-[90px]">
            <p>This project is licensed under the <a href="/path-to-license">GNU License</a>.</p>
            <p>For questions or contributions, feel free to  
                <a href="https://github.com/Merna-Khalid/Quizie-Fast/issues" target="_blank" rel="noopener noreferrer"> open an issue</a>.
            </p>
            <p>Version 1.0.0</p>
        </footer>
    );
};

export default Footer;