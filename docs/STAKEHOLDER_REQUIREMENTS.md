# Project Pivot & Stakeholder Requirements

## 1. Context & Overview
Following the initial development phase, active code commits were paused to conduct product discovery and requirements gathering with a real-world stakeholder (eyelash technician / beauty provider). 

Through direct consultation, the project transitioned from a theoretical pet project with automated working hours to an actual commercial solution tailored to explicit, provider-managed monthly time slots.

## 2. Key Business Requirements

### Explicit Slot-Based Availability
- The service provider operates on a flexible, irregular monthly schedule.
- Static daily working hours are replaced with explicitly opened time slots uploaded on a monthly basis.
- Clients can only book available slots created and published by the provider.

### Simplified Public Booking Flow
- Public users query published, unbooked slots (`isBooked: false`) for a selected date.
- Booking an appointment directly flags the slot as reserved.

## 3. Impact on System Architecture

### Backend
- Introduce an explicit `AvailableSlot` data model/table (`id`, `employeeId`, `startTime`, `endTime`, `isBooked`).
- Update appointment generation endpoints to rely on database slots instead of runtime date calculation.

### Admin Dashboard
- Provide a management interface for creating, viewing, and removing monthly time slots.

## 4. Status
- Stakeholder requirements collected.
- Technical specifications updated.
- Ready for backend slot-model implementation.