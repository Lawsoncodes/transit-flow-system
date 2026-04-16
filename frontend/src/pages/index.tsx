import { useEffect, useState } from 'react';
import { Schedule, Station } from '@/types';
import { scheduleAPI, stationAPI } from '@/lib/api';
import { format } from 'date-fns';
import { Search, Calendar, MapPin, Users, Clock } from 'lucide-react';

export default function Home() {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [stations, setStations] = useState<Station[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useState({
    origin: '',
    destination: '',
    date: format(new Date(), 'yyyy-MM-dd')
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [schedulesData, stationsData] = await Promise.all([
        scheduleAPI.getSchedules(searchParams),
        stationAPI.getStations()
      ]);
      setSchedules(schedulesData.schedules || []);
      setStations(stationsData.stations || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setLoading(true);
    fetchData();
  };

  const getCongestionColor = (level: string) => {
    switch (level) {
      case 'low': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'high': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-primary-600">TransitFlow</h1>
            </div>
            <nav className="flex space-x-4">
              <button className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium">
                Login
              </button>
              <button className="bg-primary-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-primary-700">
                Sign Up
              </button>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Section */}
        <section className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Find Your Journey</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <MapPin className="inline w-4 h-4 mr-1" />
                Origin
              </label>
              <select
                value={searchParams.origin}
                onChange={(e) => setSearchParams({...searchParams, origin: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="">Select origin</option>
                {stations.map((station) => (
                  <option key={station.id} value={station.name}>
                    {station.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <MapPin className="inline w-4 h-4 mr-1" />
                Destination
              </label>
              <select
                value={searchParams.destination}
                onChange={(e) => setSearchParams({...searchParams, destination: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="">Select destination</option>
                {stations.map((station) => (
                  <option key={station.id} value={station.name}>
                    {station.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <Calendar className="inline w-4 h-4 mr-1" />
                Date
              </label>
              <input
                type="date"
                value={searchParams.date}
                onChange={(e) => setSearchParams({...searchParams, date: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div className="flex items-end">
              <button
                onClick={handleSearch}
                className="w-full bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 flex items-center justify-center"
              >
                <Search className="w-4 h-4 mr-2" />
                Search
              </button>
            </div>
          </div>
        </section>

        {/* Station Congestion Status */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Station Status</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {stations.map((station) => (
              <div key={station.id} className="bg-white rounded-lg shadow p-4">
                <h3 className="font-medium text-gray-900">{station.name}</h3>
                <p className="text-sm text-gray-600">{station.location}</p>
                <div className="mt-2">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getCongestionColor(station.congestion_level)}`}>
                    {station.congestion_level.toUpperCase()} CONGESTION
                  </span>
                </div>
                <div className="mt-2 text-sm text-gray-500">
                  <Users className="inline w-4 h-4 mr-1" />
                  {station.current_occupancy}/{station.capacity}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Available Schedules */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Available Schedules</h2>
          <div className="space-y-4">
            {schedules.map((schedule) => (
              <div key={schedule.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 mr-2">
                        {schedule.vehicle?.type?.toUpperCase()}
                      </span>
                      <h3 className="text-lg font-medium text-gray-900">
                        {schedule.vehicle?.name}
                      </h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <div className="flex items-center text-gray-600">
                          <MapPin className="w-4 h-4 mr-1" />
                          {schedule.origin_station?.name}
                        </div>
                        <div className="flex items-center text-gray-900 font-medium">
                          <Clock className="w-4 h-4 mr-1" />
                          {format(new Date(schedule.departure_time), 'HH:mm')}
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center text-gray-600">
                          <MapPin className="w-4 h-4 mr-1" />
                          {schedule.destination_station?.name}
                        </div>
                        <div className="flex items-center text-gray-900 font-medium">
                          <Clock className="w-4 h-4 mr-1" />
                          {format(new Date(schedule.arrival_time), 'HH:mm')}
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center text-gray-600">
                          <Users className="w-4 h-4 mr-1" />
                          {schedule.available_seats}/{schedule.total_seats} seats
                        </div>
                        <div className="text-lg font-bold text-primary-600">
                          ${schedule.price}
                        </div>
                      </div>
                    </div>
                  </div>
                  <button className="ml-4 bg-primary-600 text-white px-6 py-2 rounded-md hover:bg-primary-700">
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
