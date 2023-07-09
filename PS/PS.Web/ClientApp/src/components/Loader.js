import './Loader.css';

const Loader = () => {
    return (
        <div className="loading p-5 d-flex justify-content-center">
            <svg width="64px" height="48px">
                <polyline points="0.157 23.954, 14 23.954, 21.843 48, 43 0, 50 24, 64 24" id="back"></polyline>
                <polyline points="0.157 23.954, 14 23.954, 21.843 48, 43 0, 50 24, 64 24" id="front"></polyline>
            </svg>
        </div>
    )
}

export default Loader