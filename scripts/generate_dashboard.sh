#!/bin/bash
set -e

# Variables
INDEX_FILE=reports-history/index.html
MAX_RECENT=10
mkdir -p reports-history

# Cabecera HTML
cat > $INDEX_FILE <<'HTML'
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Playwright Reports Dashboard</title>
  <style>
    body { font-family: Arial, sans-serif; background: #f4f6f8; margin:0; padding:20px; }
    h1 { text-align:center; margin-bottom:20px; }
    table { border-collapse: collapse; margin:auto; width:95%; background:white; box-shadow:0 2px 6px rgba(0,0,0,0.1); }
    th, td { padding: 12px 16px; border-bottom:1px solid #ddd; text-align:center; }
    th { background:#007acc; color:white; }
    tr:hover { background:#f1f1f1; }
    a { text-decoration:none; color:#007acc; font-weight:bold; }
    .latest { background:#e8f4ff; font-weight:bold; }
    .success { color:green; font-weight:bold; }
    .failure { color:red; font-weight:bold; }
  </style>
</head>
<body>
  <h1>Historial de Playwright Reports</h1>
  <table>
    <thead>
      <tr>
        <th>Run</th>
        <th>Branch</th>
        <th>Commit</th>
        <th>Status</th>
        <th>Reporte</th>
      </tr>
    </thead>
    <tbody>
HTML

# Listar runs
ALL_DIRS=( $(ls -d reports-history/*/ | grep -v 'latest' | sort -r) )
OLD_ROWS=""

for i in "${!ALL_DIRS[@]}"; do
  d="${ALL_DIRS[$i]}"
  TIMESTAMP=$(cat $d/timestamp.txt)
  BRANCH=$(cat $d/branch.txt)
  COMMIT=$(cat $d/commit.txt)
  STATUS="success"
  LINK="$TIMESTAMP/index.html"

  if [ "$i" -lt "$MAX_RECENT" ]; then
    echo "<tr><td>$TIMESTAMP</td><td>$BRANCH</td><td>$COMMIT</td><td class='$STATUS'>$STATUS</td><td><a href='$LINK'>Ver reporte</a></td></tr>" >> $INDEX_FILE
  else
    OLD_ROWS+="<tr><td>$TIMESTAMP</td><td>$BRANCH</td><td>$COMMIT</td><td class='$STATUS'>$STATUS</td><td><a href='$LINK'>Ver reporte</a></td></tr>"
  fi
done

if [ ! -z "$OLD_ROWS" ]; then
  echo "<tr><td colspan='5'><details><summary>Mostrar runs antiguos</summary><table style='width:100%;'>${OLD_ROWS}</table></details></td></tr>" >> $INDEX_FILE
fi

# Último run
if [ -d reports-history/latest ]; then
  BRANCH=$(cat reports-history/latest/branch.txt)
  COMMIT=$(cat reports-history/latest/commit.txt)
  STATUS="success"
  echo "<tr class='latest'><td>Último</td><td>$BRANCH</td><td>$COMMIT</td><td class='$STATUS'>$STATUS</td><td><a href='latest/index.html'>Ver reporte</a></td></tr>" >> $INDEX_FILE
fi

# Cierre HTML
cat >> $INDEX_FILE <<'HTML'
    </tbody>
  </table>
</body>
</html>
HTML
