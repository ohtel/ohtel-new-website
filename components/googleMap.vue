<template>
  <div>
    <div id="map" style="height: 400px; width: 100%"></div>
    <div v-if="showControls" class="map-actions">
      <input
        v-if="map"
        class="map-search"
        type="text"
        v-model="searchQuery"
        placeholder="Search location"
        @input="onSearchInput"
        @keydown.enter="searchLocation"
      />
      <ul v-if="suggestions.length" class="suggestions-list">
        <li
          class="suggestion-item"
          v-for="(suggestion, index) in suggestions"
          :key="index"
          @click="selectLocation(suggestion)"
        >
          <span style="font-size: 10px">📌</span>
          {{ suggestion.description }}
        </li>
      </ul>
    </div>
    <div v-if="map && showControls" class="map-buttons">
      <button
        class="save-button current-location"
        @click.prevent="fetchCurrentLocation"
      >
        Current Location
      </button>
      <button
        class="save-button confirm-location"
        @click.prevent="confirmLocation"
      >
        Confirm Location
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: "",
      suggestions: [],
      address: "",
      map: null,
      marker: null,
      isLoading: false,
      defaultLocation: { lat: 12.9716, lng: 77.5946 },
    };
  },
  props: {
    mapCenter: Object,
    showControls: {
      type: Boolean,
      default: true,
    },
  },
  mounted() {
    this.loadGoogleMapsScript().then(() => {
      this.initializeMap();
    });
  },
  methods: {
    loadGoogleMapsScript() {
      return new Promise((resolve, reject) => {
        if (typeof google !== "undefined" && google.maps) {
          resolve();
          return;
        }

        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBsG-EGz_k6QKG0eAHN03mtKQQKVMKmCq0&libraries=places`;
        script.async = true;
        script.defer = true;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });
    },
    initializeMap() {
      this.$nextTick(() => {
        const mapDiv = document.getElementById("map");
        if (!mapDiv) {
          console.error("Map container not found!");
          return;
        }

        const mapOptions = {
          center: this.mapCenter || this.defaultLocation,
          zoom: 13,
          scrollwheel: false,
          gestureHandling: "none",
        };

        this.map = new google.maps.Map(mapDiv, mapOptions);

        this.marker = new google.maps.Marker({
          position: this.mapCenter || this.defaultLocation,
          map: this.map,
          draggable: true,
        });

        this.marker.addListener("dragend", () => {
          const position = this.marker.getPosition();
          this.reverseGeocode(position.lat(), position.lng());
        });

        this.reverseGeocode(
          (this.mapCenter && this.mapCenter.lat) || this.defaultLocation.lat,
          (this.mapCenter && this.mapCenter.lng) || this.defaultLocation.lng
        );
      });
    },
    onSearchInput() {
      if (this.searchQuery.trim() === "") {
        this.suggestions = [];
        return;
      }
      this.fetchSuggestions();
    },
    fetchSuggestions() {
      const service = new google.maps.places.AutocompleteService();
      service.getPlacePredictions(
        { input: this.searchQuery },
        (predictions, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            this.suggestions = predictions;
          }
        }
      );
    },
    selectLocation(suggestion) {
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode(
        { address: suggestion.description },
        (results, status) => {
          if (status === google.maps.GeocoderStatus.OK) {
            const location = results[0].geometry.location;
            this.setLocation(location.lat(), location.lng());
          }
        }
      );
      this.suggestions = [];
      this.searchQuery = suggestion.description;
    },
    setLocation(lat, lng) {
      this.defaultLocation = { lat, lng };
      const position = { lat, lng };
      if (position) {
        this.marker.setPosition(position);
        this.map.setCenter(position);
      }

      // Reverse geocode to get the address
      this.reverseGeocode(lat, lng);
      const eventData = {
        mapClosed: false,
        address: this.address,
        locationInformation: this.defaultLocation,
      };
      this.$emit("mapEvent", eventData);
    },
    fetchCurrentLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            this.setLocation(latitude, longitude);
          },
          (error) => {
            alert("Error fetching current location: " + error.message);
          }
        );
      } else {
        alert("Geolocation is not supported by this browser.");
      }
    },
    reverseGeocode(lat, lng) {
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ location: { lat, lng } }, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK && results[0]) {
          this.address = results[0].formatted_address;
          console.log("Address updated:", this.address);
        } else {
          alert("No address found for this location.");
        }
      });
    },
    confirmLocation() {
      const position = this.marker.getPosition(); // Get the marker's current position
      this.reverseGeocode(position.lat(), position.lng()); // Perform reverse geocoding for the marker's position

      // Use a timeout to ensure reverse geocoding completes before emitting the event
      setTimeout(() => {
        const eventData = {
          mapClosed: true,
          address: this.address || "Location not found", // Fallback if no address
          locationInformation: { lat: position.lat(), lng: position.lng() },
        };
        this.$emit("mapEvent", eventData);
        this.searchQuery = "";
        this.showMap = false;
      }, 200); // Adjust the timeout to ensure geocoding has time to update the address
    },
  },
};
</script>

<style>
.map-modal {
  position: relative;
  margin-bottom: 20px;
}
.map-actions {
  position: absolute;
  top: 98px;
  left: 20px;
  max-width: 200px;
}

.suggestion-item {
  list-style: none;
  padding: 5px;
  width: 200px;
  background-color: white;
  overflow: hidden; /* Prevents content overflow */
  white-space: nowrap; /* Prevents wrapping */
  text-overflow: ellipsis; /* Adds ellipsis if content is too long */
  cursor: pointer; /* Indicates the item is clickable */
  text-align: left;
}
.suggestions-list {
  padding: 0px;
  background-color: white;
}

.suggestion-item:hover {
  background-color: rgba(
    60,
    64,
    67,
    0.04
  ); /* Highlight on hover for better UX */
}

.save-button,
.close-button {
  padding: 10px 20px;
  font-size: 14px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
.save-button {
  background-color: #47509b;
  color: white;
}
.close-button {
  background-color: #a20584;
  color: white;
}

.map-buttons {
  position: absolute;
    bottom: 30px;
    width: 50%;
    display: flex;
    left: 30px;
    /* justify-content: center; */
    /* align-items: center; */
    gap: 20px;
}
.map-search {
  width: 100%;
  padding: 12px 15px; /* Adjust padding for better spacing */
  font-size: 16px; /* Slightly larger font for readability */
  outline: none;
  transition: border-color 0.3s ease, box-shadow 0.3s ease; /* Add smooth transitions */
  border: 1px solid #ccc; /* Light gray border for a modern look */
  border-radius: 5px; /* Rounded corners for a softer appearance */
  background-color: #f9f9f9; /* Subtle background color */
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1); /* Slight inner shadow for depth */
  color: #333; /* Dark gray text for contrast */
  margin-left: 10px;
}

/* Add focus styles for interactivity */
.map-search:focus {
  border-color: #47509b; /* Highlight border on focus */
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5); /* Subtle blue glow */
  background-color: #fff; /* Brighter background */
}

/* Optional placeholder styles */
.map-search::placeholder {
  color: #aaa; /* Light gray placeholder text */
  font-style: italic; /* Italic style for placeholders */
}
</style>