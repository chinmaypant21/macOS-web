const GoogleMapsApp = () => {
    return (
        <iframe
            style="width: 100%; height: 100%; border: 0;"

            id="gmap_canvas" 
            src="https://maps.google.com/maps?q=India&t=h&z=5&ie=UTF8&iwloc=&output=embed" 
            frameborder="0" 
            scrolling="no" 
        ></iframe>

    )
}

export default GoogleMapsApp;