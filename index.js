// Your code here
function createEmployeeRecord(employeeData) {
    return {
        firstName: employeeData[0],
        familyName: employeeData[1],
        title: employeeData[2],
        payPerHour: employeeData[3],
        timeInEvents: [],
        timeOutEvents: []
      };

}

function createEmployeeRecords(employeesData) {
    return employeesData.map(createEmployeeRecord);
}
  
function createTimeInEvent(employee, dateStamp) {
    const [date, hour] = dateStamp.split(' ');
    employee.timeInEvents.push({
      type: "TimeIn",
      hour: parseInt(hour, 10),
      date: date
    });
    return employee;
}

function createTimeOutEvent(employee, dateStamp) {
    const [date, hour] = dateStamp.split(' ');
    employee.timeOutEvents.push({
      type: "TimeOut",
      hour: parseInt(hour, 10),
      date: date
    });
    return employee;
  }

function hoursWorkedOnDate(employee, date) {
    const timeIn = employee.timeInEvents.find(event => event.date === date);
    const timeOut = employee.timeOutEvents.find(event => event.date === date);
    
    if (timeIn && timeOut) {
      return (timeOut.hour - timeIn.hour) / 100;
    } else {
      return 0;
    }
  }
  
  function wagesEarnedOnDate(employee, date) {
    const hoursWorked = hoursWorkedOnDate(employee, date);
    const payRate = employee.payPerHour;
    return hoursWorked * payRate;
  }
   
  function allWagesFor(employee) {
    const datesWorked = employee.timeInEvents.map(event => event.date);
    let totalWages = 0;
    datesWorked.forEach(date => {
      totalWages += wagesEarnedOnDate(employee, date);
    });
    return totalWages;
  }
    
  function calculatePayroll(employees) {
    let totalPayroll = 0;
    employees.forEach(employee => {
      totalPayroll += allWagesFor(employee);
    });
    return totalPayroll;
  }
    