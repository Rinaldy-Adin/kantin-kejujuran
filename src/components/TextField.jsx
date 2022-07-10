const LargeTextField = ({ isDisabled, defaultValue }) => {
    return (
        <div className='w-[300px] lg:w-[530px] px-5 py-3 rounded-[10px] bg-KJJGray flex justify-between items-center font-bold'>
            <h1 className='text-2xl lg:text-5xl'>Rp</h1>
            <input
                autoFocus
                disabled={!!isDisabled}
                className='font-default select-none text-3xl lg:text-5xl lg:leading-[72px] bg-inherit w-[230px] lg:w-[410px] text-right focus:outline-0'
                value={defaultValue}
            />
        </div>
    );
};

const SmallTextField = ({ isDisabled, defaultValue }) => {
    return (
        <div className='w-[250px] px-3 py-1 rounded-[6px] bg-KJJGray flex justify-between items-center font-bold'>
            <h3>Rp</h3>
            <input
                autoFocus
                disabled={!!isDisabled}
                className='font-default select-none text-2xl leading-[36px] bg-inherit w-[180px] text-right focus:outline-0'
                value={defaultValue}
            />
        </div>
    );
};

export { LargeTextField, SmallTextField };
