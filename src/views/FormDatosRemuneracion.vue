<template>
  <div class="form">
    <div>
      <label for="sueldoBase">Sueldo Base</label>
      <select
        id="sueldoBase"
        name="sueldoBase"
      >
        <option value="m">
          Mensual
        </option>
        <option value="s">
          Semanal
        </option>
        <option value="d">
          Diaria
        </option>
        <option value="bm">
          Bimestral
        </option>
      </select>
    </div>
    <h1>Periodicidad y Forma de Pago</h1>
    <div>
      <label for="periodoPago">Período de Pago</label>
      <input type="text">
    </div>
  </div>
</template>
