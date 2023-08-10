import React, {useEffect, useRef, useState} from 'react';
import styles from '../../styles/components/OrderFoodInBar.module.css';
import mapboxGl from "mapbox-gl";

export default function  MapOrderFood({restaurants,user,setSelectedRestaurant}) {
    const mapContainerRef = useRef(null);
    const [mapInstance, setMapInstance] = useState(null)

    useEffect(() => {
        mapboxGl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

        const map = new mapboxGl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/mapbox/dark-v10',
            center: [31, 49],
            zoom: 5
        });

        map.on('load', () => {
            setMapInstance(map);
            map.loadImage('/static/marker-15.png', (error, image) => {
                if (error) throw error;

                map.addImage('marker-icon', image);
                map.addSource('markers', {
                    type: 'geojson',
                    data: {
                        type: 'FeatureCollection',
                        features: restaurants.map((r) => ({
                            type: 'Feature',
                            properties: r,
                            geometry: {
                                type: 'Point',
                                coordinates: [parseFloat(r.longitude), parseFloat(r.latitude)]
                            }
                        }))
                    }
                });
                map.addLayer({
                    id: 'markers',
                    type: 'symbol',
                    source: 'markers',
                    layout: {
                        'icon-image': 'marker-icon',
                        'icon-size': 0.07
                    }
                });
            });


            map.loadImage(user.image ? user.image : null, (error, image) => {
                if (error) throw error;

                const maxImageSize = 100; // Максимальний розмір зображення (ширина та висота)
                const aspectRatio = image.width / image.height; // Співвідношення сторін зображення

                let markerSize;

                if (image.width > image.height) {
                    markerSize = [maxImageSize, maxImageSize / aspectRatio];
                } else {
                    markerSize = [maxImageSize * aspectRatio, maxImageSize];
                }

                map.addImage('user-image', image, { width: markerSize[0], height: markerSize[1] });

                map.addSource('users', {
                    type: 'geojson',
                    data: {
                        type: 'FeatureCollection',
                        features: []
                    }
                });

                map.addLayer({
                    id: 'users',
                    type: 'symbol',
                    source: 'users',
                    layout: {
                        // "icon-image": ["concat", "user-marker-icon-", ["get", "id"]],
                        'icon-image': 'user-image',
                        'icon-size': 0.07
                    }
                });
            });
        });

        map.on('click', (e) => {
            const features = map.queryRenderedFeatures(e.point);
            if (features.length > 0 && features[0].layer.id === 'markers') {
                setSelectedRestaurant(features[0].properties.idBar);
            }
        });

        return () => map.remove(); // Clean up the map instance on unmount
    }, [restaurants, user]);

    const handleShowMeClick = ()=>{
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position)=>{
                const { latitude, longitude } = position.coords;

                mapInstance.setCenter([longitude, latitude]);
                mapInstance.setZoom(10)
                const source = mapInstance.getSource('users');

                source.setData({
                    type: 'FeatureCollection',
                    features: [
                        ...source._data.features,
                        {
                            type: 'Feature',
                            properties: { user: 'user'},
                            geometry: {
                                type: 'Point',
                                coordinates: [longitude, latitude]
                            }
                        }
                    ]
                });

            });
        }else{
            console.log("not location")
        }
    }
    return (
        <>
            <div ref={mapContainerRef} className={styles.mapContainer} ></div>
            <button type="button" className={styles.showMe} onClick={handleShowMeClick}>Show me</button>
        </>
    )
};

// ToDo image show me need do circle