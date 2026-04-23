'use client';

import { useEffect, useMemo, useRef } from 'react';

import L, { type DivIcon, type Map as LeafletMap, type Marker } from 'leaflet';
import 'leaflet.markercluster';
import { MapContainer, ScaleControl, TileLayer, ZoomControl, useMap } from 'react-leaflet';

import { tours } from '@/lib/data';
import type { MapPointRecord } from '@/lib/types';
import { getTourById } from '@/lib/utils';

interface MapInnerProps {
  points: MapPointRecord[];
  selectedPointId?: string | null;
  onPointSelect?: (point: MapPointRecord) => void;
  className?: string;
  simplified?: boolean;
}

const createMarkerIcon = (type: MapPointRecord['type']): DivIcon => {
  const color =
    type === 'tour' ? '#2563EB' : type === 'attraction' ? '#F59E0B' : '#0F172A';

  return L.divIcon({
    className: 'custom-map-marker',
    html: `
      <div style="display:flex;align-items:center;justify-content:center;width:42px;height:42px;border-radius:999px;background:${color};box-shadow:0 14px 30px -18px rgba(15,23,42,.65);border:3px solid rgba(255,255,255,.78);">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="display:block">
          <path d="M3 16L8 8L12 14L16 10L21 16" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <circle cx="17" cy="6" r="2.25" stroke="white" stroke-width="2"/>
        </svg>
      </div>
    `,
    iconSize: [42, 42],
    iconAnchor: [21, 21],
    popupAnchor: [0, -18]
  });
};

const getPopupMarkup = (point: MapPointRecord, tourHref?: string) => `
  <div style="width:220px">
    <div style="position:relative;height:112px;overflow:hidden;border-radius:14px">
      <img src="${point.image}" alt="${point.name}" style="width:100%;height:100%;object-fit:cover;display:block" />
    </div>
    <div style="padding:12px 4px 4px">
      <h3 style="margin:0 0 8px;font-size:16px;line-height:1.3;font-weight:700;color:#0F172A">${point.name}</h3>
      <p style="margin:0 0 10px;font-size:13px;line-height:1.5;color:#475569">${point.description}</p>
      ${
        point.rating
          ? `<div style="margin-bottom:10px;font-size:13px;font-weight:700;color:#F59E0B">★ ${point.rating.toFixed(1)}</div>`
          : ''
      }
      ${
        tourHref
          ? `<a href="${tourHref}" style="display:inline-flex;border-radius:999px;background:#2563EB;color:#fff;padding:10px 14px;font-size:13px;font-weight:700;text-decoration:none">Смотреть тур</a>`
          : ''
      }
    </div>
  </div>
`;

function MarkersLayer({
  points,
  selectedPointId,
  onPointSelect
}: Pick<MapInnerProps, 'points' | 'selectedPointId' | 'onPointSelect'>) {
  const map = useMap();
  const clusterGroupRef = useRef<L.MarkerClusterGroup | null>(null);
  const markersRef = useRef<Record<string, Marker>>({});

  useEffect(() => {
    const clusterGroup = L.markerClusterGroup({
      chunkedLoading: true,
      showCoverageOnHover: false,
      spiderfyOnMaxZoom: true
    });

    markersRef.current = {};

    points.forEach((point) => {
      const relatedTour = point.tourId ? getTourById(tours, point.tourId) : undefined;
      const marker = L.marker([point.coordinates.lat, point.coordinates.lng], {
        icon: createMarkerIcon(point.type)
      });

      marker.bindPopup(getPopupMarkup(point, relatedTour ? `/tours/${relatedTour.slug}` : undefined), {
        closeButton: false,
        className: 'travel-popup'
      });
      marker.on('click', () => onPointSelect?.(point));
      clusterGroup.addLayer(marker);
      markersRef.current[point.id] = marker;
    });

    clusterGroupRef.current = clusterGroup;
    map.addLayer(clusterGroup);

    return () => {
      clusterGroup.clearLayers();
      map.removeLayer(clusterGroup);
    };
  }, [map, onPointSelect, points]);

  useEffect(() => {
    if (!selectedPointId) {
      return;
    }

    const marker = markersRef.current[selectedPointId];
    const point = points.find((item) => item.id === selectedPointId);

    if (!marker || !point) {
      return;
    }

    map.flyTo([point.coordinates.lat, point.coordinates.lng], Math.max(map.getZoom(), 9), {
      animate: true,
      duration: 1.15
    });

    setTimeout(() => {
      clusterGroupRef.current?.zoomToShowLayer(marker, () => marker.openPopup());
    }, 250);
  }, [map, points, selectedPointId]);

  return null;
}

function MapBridge({ selectedPointId, points }: Pick<MapInnerProps, 'selectedPointId' | 'points'>) {
  const map = useMap();
  const previousPointRef = useRef<string | null | undefined>(selectedPointId);

  useEffect(() => {
    if (previousPointRef.current === selectedPointId || !selectedPointId) {
      return;
    }

    const point = points.find((item) => item.id === selectedPointId);
    if (point) {
      map.flyTo([point.coordinates.lat, point.coordinates.lng], 9, { duration: 1 });
    }

    previousPointRef.current = selectedPointId;
  }, [map, points, selectedPointId]);

  return null;
}

export function MapInner({ points, selectedPointId, onPointSelect, className, simplified = false }: MapInnerProps) {
  const center = useMemo<[number, number]>(() => [41.2044, 74.7661], []);

  return (
    <div className={className}>
      <MapContainer
        center={center}
        zoom={7}
        zoomControl={false}
        className="h-full min-h-[400px] w-full rounded-[2rem]"
        scrollWheelZoom
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors | Practicuma Travel'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {!simplified ? <ZoomControl position="topright" /> : null}
        <ScaleControl position="bottomleft" metric imperial={false} />
        <MarkersLayer points={points} selectedPointId={selectedPointId} onPointSelect={onPointSelect} />
        <MapBridge selectedPointId={selectedPointId} points={points} />
      </MapContainer>
    </div>
  );
}
