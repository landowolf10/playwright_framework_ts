#!/bin/bash
set -e

# Primer argumento: carpeta del run actual
RUN_DIR="$1"
if [ -z "$RUN_DIR" ]; then
  echo "Uso: $0 <run_directory>"
  exit 1
fi

HISTORY_DIR="$(dirname "$RUN_DIR")"
INDEX_FILE="$HISTORY_DIR/index.html"

# Limpiar index anterior
cat > "$INDEX_FILE" <<'EOF'
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
EOF

# Iterar todos los runs
for dir in $(ls -d "$HISTORY_DIR"/*/ | grep -v 'latest' | sort -r); do
  TIMESTAMP=$(cat "$dir/timestamp.txt")
  BRANCH=$(cat "$dir/branch.txt")
  COMMIT=$(cat "$dir/commit.txt")
  STATUS="success"
  LINK="$TIMESTAMP/index.html"

  echo "<tr><td>$TIMESTAMP</td><td>$BRANCH</td><td>$COMMIT</td><td class='$STATUS'>$STATUS</td><td><a href='$LINK'>Ver reporte</a></td></tr>" >> "$INDEX_FILE"
done

# Último run como destacado
if [ -d "$HISTORY_DIR/latest" ]; then
  BRANCH=$(cat "$HISTORY_DIR/latest/branch.txt")
  COMMIT=$(cat "$HISTORY_DIR/latest/commit.txt")
  STATUS="success"
  echo "<tr class='latest'><td>Último</td><td>$BRANCH</td><td>$COMMIT</td><td class='$STATUS'>$STATUS</td><td><a href='latest/index.html'>Ver reporte</a></td></tr>" >> "$INDEX_FILE"
fi

cat >> "$INDEX_FILE" <<'EOF'
</tbody>
</table>
</body>
</html>
EOF
