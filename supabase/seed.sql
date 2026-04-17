-- ==========================================
-- AMPARA — Seed data de demo
-- Solo ejecutar DESPUÉS de 001_initial.sql
-- Requiere al menos un usuario registrado
-- ==========================================

-- Para probar el marketplace sin usuarios reales,
-- inserta solicitudes demo directamente en Supabase
-- Dashboard > Table Editor > requests

-- EJEMPLO (reemplaza USER_ID con un UUID real de auth.users):
/*
insert into public.profiles (id, email, full_name, city, role, trust_score, onboarding_completed)
values
  ('USER_ID_1', 'laura@demo.es',  'Laura M.',   'Málaga', 'solicitante', 78, true),
  ('USER_ID_2', 'carlos@demo.es', 'Carlos T.',  'Nerja',  'ambos',       65, true),
  ('USER_ID_3', 'ana@demo.es',    'Ana P.',     'Málaga', 'solicitante', 91, true);

insert into public.requests
  (user_id, amount, repayment_days, reason, city, profession, income_frequency, urgency_level, repayment_type, repayment_description, status)
values
  ('USER_ID_1', 300, 30,
   'Necesito cubrir un desfase de tesorería mientras cobro una factura pendiente de un cliente.',
   'Málaga', 'Freelance diseñadora', 'irregular', 'media', 'dinero',
   'Devolución completa en 30 días al recibir el cobro de la factura.', 'open'),

  ('USER_ID_2', 800, 90,
   'Material para un proyecto de carpintería. Tengo el encargo firmado y lo devuelvo en cuotas mensuales.',
   'Nerja', 'Carpintero autónomo', 'mensual', 'media', 'dinero',
   'Tres cuotas de 270€ mensuales.', 'open'),

  ('USER_ID_3', 150, 14,
   'Matrícula de un curso de formación online. Cobro en dos semanas y lo devuelvo de inmediato.',
   'Málaga', 'Estudiante', 'irregular', 'alta', 'dinero',
   'Devolución completa en 14 días al cobrar el trabajo de fin de mes.', 'open');
*/
