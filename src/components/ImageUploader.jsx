import { useEffect } from 'react';
import { useRef } from 'react';

const ImageUploader = ({ className, handleFile, currentImg }) => {
    const hiddenFileInput = useRef(null);

    const handleClick = (event) => {
        hiddenFileInput.current.click();
    };

    const handleChange = (event) => {
        const fileUploaded = event.target.files[0];
        handleFile(fileUploaded);
    };

    useEffect(() => {
        console.log(currentImg);
    }, [currentImg]);

    return (
        <>
            <div
                className={
                    'hover:cursor-pointer bg-[#F5F5F5] flex justify-center items-center text-center text-KJJGray-dark ' +
                    className
                }
                onClick={handleClick}
            >
                <h3>
                    {!currentImg && (
                        <>
                            +<br />
                        </>
                    )}
                    {!currentImg
                        ? 'Upload Item Image'
                        : `"${currentImg.name}" uploaded`}
                </h3>
            </div>
            <input
                type='file'
                ref={hiddenFileInput}
                onChange={handleChange}
                style={{ display: 'none' }}
            />
        </>
    );
};

export default ImageUploader;
