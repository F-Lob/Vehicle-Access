"use strict";

import { respondError } from "../utils/resHandler.js";
import { handleError } from "../utils/errorHandler.js";

function authorizeRoles(...allowedRoles) {
  return (req, res, next) => {
    try {
      const userRoles = req.roles || [];
      const hasRole = userRoles.some((role) => allowedRoles.includes(role));

      if (!hasRole) {
        return respondError(req, res, 403, "No tienes permisos para realizar esta accion");
      }

      return next();
    } catch (error) {
      handleError(error, "authorization.middleware -> authorizeRoles");
      return respondError(req, res, 500, "No se pudieron verificar los permisos");
    }
  };
}

const isAdmin = authorizeRoles("admin");
const isOperator = authorizeRoles("operator");
const canViewAccessRecords = authorizeRoles("admin", "operator", "viewer");

export { authorizeRoles, canViewAccessRecords, isAdmin, isOperator };
