import { GuestRepo } from "./repositories/guestRepo.js";
import { EmployeeRepo } from "./repositories/employeeRepo.js";
import { AppointmentRepo } from "./repositories/appointmentRepo.js";
import { ServiceRepo } from "./repositories/serviceRepo.js";
import { GuestService } from "./services/guestService.js";
import { EmployeeService } from "./services/employeeService.js";
import { ServiceService } from "./services/serviceService.js";
import { AppointmentService } from "./services/appointmentService.js";
import { GuestController } from "./controllers/guestController.js";
import { EmployeeController } from "./controllers/employeeController.js";
import { ServiceController } from "./controllers/serviceController.js";
import { AppointmentController } from "./controllers/appointmentController.js";

export const guestRepo = new GuestRepo()
export const employeeRepo = new EmployeeRepo()
export const appointmentRepo = new AppointmentRepo()
export const serviceRepo = new ServiceRepo()
export const guestService = new GuestService(guestRepo)
export const employeeService = new EmployeeService(employeeRepo)
export const serviceService = new ServiceService(serviceRepo)
export const appointmentService = new AppointmentService(guestService, employeeRepo, serviceRepo, appointmentRepo)
export const guestController = new GuestController(guestService)
export const employeeController = new EmployeeController(employeeService)
export const serviceController = new ServiceController(serviceService)
export const appointmentController = new AppointmentController(appointmentService)