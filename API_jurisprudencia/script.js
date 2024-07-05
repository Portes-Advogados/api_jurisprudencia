document.getElementById('searchForm').addEventListener('submit', function (event) {
    event.preventDefault();
  
    const estado = document.getElementById('estado').value;
    const dataInicio = document.getElementById('dataInicio').value;
    const dataFim = document.getElementById('dataFim').value;
  
    fetchJurisprudencias(estado, dataInicio, dataFim);
  });
  
  function fetchJurisprudencias(estado, dataInicio, dataFim) {
    const apiUrl = `https://api-publica.datajud.cnj.jus.br/api_publica_${estado.toLowerCase()}/_search`;
    const apiKey = 'cDZHYzlZa0JadVREZDJCendQbXY6SkJlTzNjLV9TRENyQk1RdnFKZGRQdw==';
  
    fetch(`${apiUrl}?estado=${estado}&dataInicio=${dataInicio}&dataFim=${dataFim}`, {
      method: 'GET',
      headers: {
        'Authorization': `APIKey ${apiKey}`,
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => displayResults(data))
    .catch(error => console.error('Erro:', error));
  }
  
  function displayResults(data) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';
  
    if (data.length > 0) {
      data.forEach(item => {
        const div = document.createElement('div');
        div.classList.add('result-item');
        div.innerHTML = `
          <p><strong>ID:</strong> ${item.id}</p>
          <p><strong>Tribunal:</strong> ${item.tribunal}</p>
          <p><strong>Vara:</strong> ${item.vara}</p>
          <p><strong>Data:</strong> ${item.data}</p>
          <p><strong>Resumo:</strong> ${item.resumo}</p>
        `;
        resultsDiv.appendChild(div);
      });
    } else {
      resultsDiv.innerHTML = '<p>Nenhuma jurisprudência encontrada para os critérios especificados.</p>';
    }
  }
  