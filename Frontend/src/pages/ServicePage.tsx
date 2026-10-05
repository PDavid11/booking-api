import React, { useState, useEffect } from "react";

interface Service {
  id: string;
  name: string;
  durationMinutes: number;
  price: number;
}

export const ServicePage: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [name, setName] = useState("");
  const [durationMinutes, setDurationMinutes] = useState(0);
  const [price, setPrice] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  const token = localStorage.getItem("token");

  const fetchServices = async () => {
    try {
      const response = await fetch("http://localhost:3000/services");
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch services");
      }
      setServices(data.result);
    } catch (err: any) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleAddService = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch("http://localhost:3000/services", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, durationMinutes, price }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to add service");
      }
      setName("");
      setDurationMinutes(0);
      setPrice(0);
      fetchServices();
    } catch (err: any) {
      setError(err.message);
    }
  };
  const handleDeleteService = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this service?")) return;

    try {
      const response = await fetch(`http://localhost:3000/services`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id }),
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to delete service");
      }
      fetchServices();
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-semibold tracking-tight">Services Management</h1>

      {error && <p className="mt-4 text-sm text-accent">{error}</p>}

      <form onSubmit={handleAddService} className="mt-6 max-w-lg rounded-[12px] border border-line bg-surface p-6">
        <div className="flex flex-col gap-2">
          <p className="text-sm font-semibold">Service Name:</p>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="rounded-[12px] border border-line px-3 py-2.5 outline-none focus:border-accent"
          />
        </div>
        <div className="mt-4 flex flex-col gap-2">
          <p className="text-sm font-semibold">Price:</p>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(parseFloat(e.target.value) || 0)}
            required
            className="rounded-[12px] border border-line px-3 py-2.5 outline-none focus:border-accent"
          />
        </div>
        <div className="mt-4 flex flex-col gap-2">
          <p className="text-sm font-semibold">Duration (minutes):</p>
          <input
            type="number"
            value={durationMinutes}
            onChange={(e) => setDurationMinutes(parseFloat(e.target.value) || 0)}
            required
            className="rounded-[12px] border border-line px-3 py-2.5 outline-none focus:border-accent"
          />
        </div>
        <button
          type="submit"
          className="mt-5 w-full rounded-[12px] bg-accent py-3 text-sm font-semibold text-white hover:bg-accent-hover"
        >
          Add Service
        </button>
      </form>

      <h2 className="mt-10 text-xl font-semibold">Existing Services</h2>
      {services.length === 0 ? (
        <p className="mt-4 text-muted">No services available.</p>
      ) : (
        <ul className="mt-4 grid gap-3 md:grid-cols-2">
          {services.map((service) => (
            <li key={service.id} className="rounded-[12px] border border-line bg-surface p-4">
              <strong>{service.name}</strong> - Duration: {service.durationMinutes} min, Price:{" "}
              {service.price.toFixed(2)} Ft
              <button
                onClick={() => handleDeleteService(service.id)}
                className="mt-3 block rounded-[12px] bg-ink px-3 py-1.5 text-sm font-semibold text-white"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
