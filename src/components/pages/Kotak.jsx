import KantinBox from '../KantinBox';
import { TambahUangModal } from '../KotakModals';

const Kotak = () => {
    return (
        <div className='w-screen mt-8 flex-1 flex flex-col'>
            <div className='xl:w-[1200px] 2xl:w-[1420px] flex-1 mx-auto flex flex-col'>
                <h1 className='font-bold'>Kotak</h1>
                <div className='flex-1 flex flex-col pt-[100px] items-center'>
                    <KantinBox />
                </div>
            </div>
        </div>
    );
};

export default Kotak;
