const SolidButton = ({ className, children, onClick }) => {
    return (
        <button
            onClick={onClick}
            className={
                'flex justify-center items-center px-8 py-2 bg-KJJBlue hover:bg-KJJBlue-hover active:bg-KJJBlue-active shadow-md rounded-full ' +
                className
            }
        >
            <h3 className='text-center font-bold text-white'>{children}</h3>
        </button>
    );
};

const TransparentButton = ({ className, children, onClick }) => {
    return (
        <button
            onClick={onClick}
            className={
                'flex justify-center items-center px-7 py-1 border-4 border-KJJBlue hover:border-KJJBlue-hover active:border-KJJBlue-active shadow-md rounded-full ' +
                className
            }
        >
            <h3 className='text-center font-bold text-KJJBlue hover:text-KJJBlue-hover active:text-KJJBlue-active'>
                {children}
            </h3>
        </button>
    );
};

const TambahItemButton = ({ className, children, onClick }) => {
    return (
        <button
            onClick={onClick}
            className={
                'flex justify-center items-center px-8 py-2 gap-2 bg-KJJBlue hover:bg-KJJBlue-hover active:bg-KJJBlue-active shadow-md rounded-full ' +
                className
            }
        >
            <h3 className='text-center font-bold text-white'>{children}</h3>
            <h2 className='font-bold text-white text-3xl'>+</h2>
        </button>
    );
};

const SmallButton = ({ className, children, onClick }) => {
    return (
        <button
            onClick={onClick}
            className={
                'flex justify-center items-center px-4 py-1 bg-KJJBlue hover:bg-KJJBlue-hover active:bg-KJJBlue-active shadow-md rounded-full ' +
                className
            }
        >
            <h4 className='text-center font-bold text-white'>{children}</h4>
        </button>
    );
};

export { SolidButton, TransparentButton, TambahItemButton, SmallButton };
