// Configuração da agenda e do banco de dados (Firebase).
// Adaptado do sistema de agendamento reutilizável (pasta Steffany).
// >>> Único arquivo com dados específicos do negócio da Larissa. <<<

window.BOOKING_CONFIG = {
  SCHEDULE: {
    // 0=domingo, 1=segunda, 2=terça, 3=quarta, 4=quinta, 5=sexta, 6=sábado
    workDays: [1, 2, 3, 4, 5, 6],
    // Horário de cada dia da semana: [horaInicio, minutoInicio, horaFim, minutoFim].
    // Os horários se repetem de hora em hora (mesmo minuto do início).
    hoursByDay: {
      1: [13, 30, 16, 30],
      2: [13, 30, 16, 30],
      3: [13, 30, 16, 30],
      4: [13, 30, 16, 30],
      5: [13, 30, 16, 30],
      6: [8, 30, 16, 30]
    },
    daysAhead: 30 // quantos dias no futuro a agenda mostra
  },

  WHATSAPP_NUMBER: '5528999876432', // formato: 55 + DDD + número, só dígitos

  // Valores públicos do projeto Firebase (Console > Configurações do projeto > Seus apps > SDK).
  // Com "COLOQUE_AQUI" no apiKey o site funciona em modo de demonstração local
  // (localStorage do navegador, não compartilhado entre pessoas) — útil pra testar
  // a interface antes de criar o projeto Firebase de verdade. Veja o passo a passo
  // em js/README-agendamento.md.
  firebaseConfig: {
    apiKey: 'AIzaSyCEBxDoT7vN6diiQ0W8LPsyj1V6ORF_qH0',
    authDomain: 'larissa-agendamento.firebaseapp.com',
    projectId: 'larissa-agendamento',
    storageBucket: 'larissa-agendamento.firebasestorage.app',
    messagingSenderId: '257102986416',
    appId: '1:257102986416:web:73c43017f805c500588f75'
  }
};

// Lista de horários de um dia específico da semana (ex.: "13:30", "14:30"...).
window.BOOKING_CONFIG.buildTimeList = function (weekday) {
  var hours = window.BOOKING_CONFIG.SCHEDULE.hoursByDay[weekday];
  if (!hours) return [];
  function pad(n) { return n < 10 ? '0' + n : '' + n; }
  var startHour = hours[0], startMinute = hours[1], endHour = hours[2], endMinute = hours[3];
  var times = [];
  var h = startHour;
  while (h < endHour || (h === endHour && startMinute <= endMinute)) {
    times.push(pad(h) + ':' + pad(startMinute));
    h += 1;
  }
  return times;
};
