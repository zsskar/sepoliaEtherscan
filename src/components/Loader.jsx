function Loader() {
    return (
        <div id="cardSpinnerWrapper" style={{margin:'auto'}}>
            <div id="cardSpinner" className="text-center py-10">
                <div className="spinner-border text-primary" role="status"><span className="visually-hidden">Loading...</span></div>
                <div className="small text-muted mt-1">Loading</div>
            </div>
        </div>
    )
}

export default Loader;
