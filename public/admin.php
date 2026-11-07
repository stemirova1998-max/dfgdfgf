<?php
include 'config.php';
session_start();

// ─── Вход по паролю ───────────────────────────────────────
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['password'])) {
    if ($_POST['password'] === ADMIN_PASSWORD) {
        $_SESSION['admin'] = true;
    } else {
        $_SESSION['error'] = 'Неверный пароль';
    }
}

// ─── Выход ─────────────────────────────────────────────────
if (isset($_GET['logout'])) {
    session_destroy();
    header('Location: admin.php');
    exit;
}

// ─── Форма входа ───────────────────────────────────────────
if (!isset($_SESSION['admin'])) {
    $error = isset($_SESSION['error']) ? $_SESSION['error'] : '';
    unset($_SESSION['error']);
?>
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Вход в админку</title>
    <style>
        *{box-sizing:border-box}
        body{font-family:'Segoe UI',Arial,sans-serif;display:flex;justify-content:center;align-items:center;min-height:100vh;background:#1a1a1a;margin:0}
        .box{background:#fff;padding:2.5rem;border-radius:12px;box-shadow:0 4px 20px rgba(0,0,0,.2);width:100%;max-width:360px}
        h2{margin:0 0 1.5rem;color:#222;text-align:center}
        input{width:100%;padding:12px;margin-bottom:14px;border:1px solid #ddd;border-radius:8px;font-size:16px}
        button{width:100%;background:#c9564a;color:#fff;padding:12px;border:none;border-radius:8px;font-size:16px;cursor:pointer}
        button:hover{background:#b0403a}
        .err{color:#c00;font-size:14px;margin-bottom:10px;text-align:center}
    </style>
</head>
<body>
    <div class="box">
        <h2>Админка сайта</h2>
        <?php if ($error): ?><div class="err"><?= htmlspecialchars($error) ?></div><?php endif; ?>
        <form method="POST">
            <input type="password" name="password" placeholder="Пароль" required autofocus>
            <button type="submit">Войти</button>
        </form>
    </div>
</body>
</html>
<?php
    exit;
}

// ─── Сохранение данных ─────────────────────────────────────
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('data.json'), true);

    // Контакты
    foreach (['city', 'address', 'phone', 'bookingUrl', 'telegramUrl', 'telegramHandle',
              'instagramUrl', 'instagramHandle', 'vkUrl', 'vkHandle'] as $f) {
        if (isset($_POST[$f])) $data[$f] = trim($_POST[$f]);
    }

    // Акция
    foreach (['badge', 'until', 'title', 'subtitle', 'text', 'note'] as $f) {
        if (isset($_POST['promo'][$f])) $data['promo'][$f] = trim($_POST['promo'][$f]);
    }
    if (isset($_POST['promo']['procedures'])) {
        $data['promo']['procedures'] = array_values(array_filter(array_map('trim', explode("\n", $_POST['promo']['procedures']))));
    }

    // Услуги
    if (isset($_POST['services'])) {
        $data['services'] = [];
        foreach ($_POST['services'] as $s) {
            $title = trim($s['title'] ?? '');
            if ($title === '') continue;
            $data['services'][] = [
                'id'          => trim($s['id'] ?? '') ?: 'srv' . time() . rand(100,999),
                'num'         => trim($s['num'] ?? ''),
                'title'       => $title,
                'description' => trim($s['description'] ?? ''),
                'price'       => trim($s['price'] ?? ''),
                'duration'    => trim($s['duration'] ?? ''),
            ];
        }
    }

    // Отзывы
    if (isset($_POST['reviews'])) {
        $data['reviews'] = [];
        foreach ($_POST['reviews'] as $r) {
            $name = trim($r['name'] ?? '');
            $text = trim($r['text'] ?? '');
            if ($name === '' && $text === '') continue;
            $data['reviews'][] = ['name' => $name, 'text' => $text];
        }
    }

    // Преимущества
    if (isset($_POST['advantages'])) {
        $data['advantages'] = [];
        foreach ($_POST['advantages'] as $a) {
            $title = trim($a['title'] ?? '');
            if ($title === '') continue;
            $data['advantages'][] = ['title' => $title, 'text' => trim($a['text'] ?? '')];
        }
    }

    file_put_contents('data.json', json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
    $_SESSION['saved'] = true;
    header('Location: admin.php');
    exit;
}

// ─── Показать админку ──────────────────────────────────────
$saved = isset($_SESSION['saved']);
if ($saved) unset($_SESSION['saved']);
$data = json_decode(file_get_contents('data.json'), true);
?>
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Админка — YARKO HAIR BEAUTY</title>
    <style>
        *{box-sizing:border-box}
        body{font-family:'Segoe UI',Arial,sans-serif;padding:20px;background:#f0f0f0;margin:0}
        .wrap{max-width:780px;margin:0 auto}
        .box{background:#fff;padding:24px;border-radius:12px;box-shadow:0 2px 12px rgba(0,0,0,.08);margin-bottom:20px}
        h2{margin:0 0 6px;color:#222;font-size:22px}
        h3{margin:0 0 14px;color:#c9564a;font-size:17px;border-bottom:2px solid #f5f5f5;padding-bottom:8px}
        label{display:block;margin-top:14px;font-weight:600;font-size:13px;color:#555}
        input,textarea{width:100%;padding:10px 12px;margin-top:5px;border:1px solid #ddd;border-radius:6px;font-size:15px;font-family:inherit}
        textarea{resize:vertical;min-height:60px}
        button{background:#c9564a;color:#fff;padding:12px 28px;border:none;border-radius:6px;font-size:16px;cursor:pointer;margin-top:20px}
        button:hover{background:#b0403a}
        .item{border:1px solid #eee;padding:14px;margin-top:10px;border-radius:8px;background:#fafafa}
        .top{display:flex;justify-content:space-between;align-items:center;margin-bottom:10px}
        .del{background:#e74c3c;padding:5px 12px;font-size:13px;margin:0}
        .add{background:#27ae60;padding:8px 16px;font-size:14px;margin-top:10px}
        .add:hover{background:#219a52}
        .logout{color:#999;text-decoration:none;font-size:14px}
        .logout:hover{color:#c00}
        .ok{background:#d4edda;color:#155724;padding:12px;border-radius:8px;margin-bottom:16px;text-align:center;font-weight:600}
        .hint{color:#888;font-size:12px;margin-top:4px}
        .grid{display:grid;grid-template-columns:1fr 1fr;gap:12px}
    </style>
</head>
<body>
<div class="wrap">
    <div class="box">
        <div class="top">
            <h2>YARKO HAIR BEAUTY — Админка</h2>
            <a href="?logout" class="logout">Выйти →</a>
        </div>
        <a href="/" target="_blank">Открыть сайт →</a>
    </div>

    <?php if ($saved): ?>
        <div class="ok">✔ Сохранено! Обновите сайт (F5), чтобы увидеть изменения.</div>
    <?php endif; ?>

    <form method="POST">

        <!-- КОНТАКТЫ -->
        <div class="box">
            <h3>📞 Контакты</h3>
            <label>Телефон:</label>
            <input name="phone" value="<?= htmlspecialchars($data['phone']) ?>">
            <label>Город:</label>
            <input name="city" value="<?= htmlspecialchars($data['city']) ?>">
            <label>Адрес:</label>
            <input name="address" value="<?= htmlspecialchars($data['address']) ?>">
            <label>Ссылка на запись (Telegram):</label>
            <input name="bookingUrl" value="<?= htmlspecialchars($data['bookingUrl']) ?>">
            <label>Telegram (ссылка):</label>
            <input name="telegramUrl" value="<?= htmlspecialchars($data['telegramUrl']) ?>">
            <label>Telegram (ник):</label>
            <input name="telegramHandle" value="<?= htmlspecialchars($data['telegramHandle']) ?>">
            <label>Instagram (ссылка):</label>
            <input name="instagramUrl" value="<?= htmlspecialchars($data['instagramUrl']) ?>">
            <label>Instagram (ник):</label>
            <input name="instagramHandle" value="<?= htmlspecialchars($data['instagramHandle']) ?>">
            <label>VK (ссылка):</label>
            <input name="vkUrl" value="<?= htmlspecialchars($data['vkUrl']) ?>">
            <label>VK (ник):</label>
            <input name="vkHandle" value="<?= htmlspecialchars($data['vkHandle']) ?>">
        </div>

        <!-- АКЦИЯ -->
        <div class="box">
            <h3>🔥 Акция</h3>
            <div class="grid">
                <div><label>Бейдж (скидка):</label><input name="promo[badge]" value="<?= htmlspecialchars($data['promo']['badge']) ?>"></div>
                <div><label>Срок:</label><input name="promo[until]" value="<?= htmlspecialchars($data['promo']['until']) ?>"></div>
            </div>
            <label>Заголовок:</label>
            <input name="promo[title]" value="<?= htmlspecialchars($data['promo']['title']) ?>">
            <label>Подзаголовок:</label>
            <input name="promo[subtitle]" value="<?= htmlspecialchars($data['promo']['subtitle']) ?>">
            <label>Текст акции:</label>
            <textarea name="promo[text]" rows="3"><?= htmlspecialchars($data['promo']['text']) ?></textarea>
            <label>Процедуры (каждая с новой строки):</label>
            <textarea name="promo[procedures]" rows="4"><?= htmlspecialchars(implode("\n", $data['promo']['procedures'])) ?></textarea>
            <label>Примечание:</label>
            <input name="promo[note]" value="<?= htmlspecialchars($data['promo']['note']) ?>">
        </div>

        <!-- УСЛУГИ -->
        <div class="box">
            <h3>💇♀️ Услуги</h3>
            <p class="hint">Чтобы удалить услугу — очистите поле «Название». Пустые услуги не отображаются на сайте.</p>
            <?php foreach ($data['services'] as $i => $s): ?>
            <div class="item">
                <div class="grid">
                    <div><label>Номер (например 01):</label><input name="services[<?= $i ?>][num]" value="<?= htmlspecialchars($s['num']) ?>"></div>
                    <div><label>ID (латиницей, без пробелов):</label><input name="services[<?= $i ?>][id]" value="<?= htmlspecialchars($s['id']) ?>"></div>
                </div>
                <label>Название:</label>
                <input name="services[<?= $i ?>][title]" value="<?= htmlspecialchars($s['title']) ?>">
                <label>Описание:</label>
                <input name="services[<?= $i ?>][description]" value="<?= htmlspecialchars($s['description']) ?>">
                <div class="grid">
                    <div><label>Цена:</label><input name="services[<?= $i ?>][price]" value="<?= htmlspecialchars($s['price']) ?>"></div>
                    <div><label>Время:</label><input name="services[<?= $i ?>][duration]" value="<?= htmlspecialchars($s['duration']) ?>"></div>
                </div>
            </div>
            <?php endforeach; ?>
            <button type="button" class="add" onclick="addService()">+ Добавить услугу</button>
        </div>

        <!-- ОТЗЫВЫ -->
        <div class="box">
            <h3>⭐ Отзывы</h3>
            <p class="hint">Чтобы удалить отзыв — очистите поля.</p>
            <?php foreach ($data['reviews'] as $i => $r): ?>
            <div class="item">
                <label>Имя:</label>
                <input name="reviews[<?= $i ?>][name]" value="<?= htmlspecialchars($r['name']) ?>">
                <label>Текст отзыва:</label>
                <textarea name="reviews[<?= $i ?>][text]" rows="2"><?= htmlspecialchars($r['text']) ?></textarea>
            </div>
            <?php endforeach; ?>
            <button type="button" class="add" onclick="addReview()">+ Добавить отзыв</button>
        </div>

        <!-- ПРЕИМУЩЕСТВА -->
        <div class="box">
            <h3>✨ Преимущества</h3>
            <?php foreach ($data['advantages'] as $i => $a): ?>
            <div class="item">
                <label>Заголовок:</label>
                <input name="advantages[<?= $i ?>][title]" value="<?= htmlspecialchars($a['title']) ?>">
                <label>Текст:</label>
                <textarea name="advantages[<?= $i ?>][text]" rows="2"><?= htmlspecialchars($a['text']) ?></textarea>
            </div>
            <?php endforeach; ?>
            <button type="button" class="add" onclick="addAdvantage()">+ Добавить преимущество</button>
        </div>

        <button type="submit">💾 Сохранить всё</button>
    </form>
</div>

<script>
// Добавление новых блоков без перезагрузки страницы
let svcCount = <?= count($data['services']) ?>;
let revCount = <?= count($data['reviews']) ?>;
let advCount = <?= count($data['advantages']) ?>;

function addService() {
    const i = svcCount++;
    const html = `<div class="item">
        <div class="grid">
            <div><label>Номер:</label><input name="services[${i}][num]" value=""></div>
            <div><label>ID:</label><input name="services[${i}][id]" value=""></div>
        </div>
        <label>Название:</label><input name="services[${i}][title]" value="">
        <label>Описание:</label><input name="services[${i}][description]" value="">
        <div class="grid">
            <div><label>Цена:</label><input name="services[${i}][price]" value=""></div>
            <div><label>Время:</label><input name="services[${i}][duration]" value=""></div>
        </div>
    </div>`;
    document.querySelector('.add').insertAdjacentHTML('beforebegin', html);
}

function addReview() {
    const i = revCount++;
    const html = `<div class="item">
        <label>Имя:</label><input name="reviews[${i}][name]" value="">
        <label>Текст отзыва:</label><textarea name="reviews[${i}][text]" rows="2"></textarea>
    </div>`;
    document.querySelectorAll('.add')[1].insertAdjacentHTML('beforebegin', html);
}

function addAdvantage() {
    const i = advCount++;
    const html = `<div class="item">
        <label>Заголовок:</label><input name="advantages[${i}][title]" value="">
        <label>Текст:</label><textarea name="advantages[${i}][text]" rows="2"></textarea>
    </div>`;
    document.querySelectorAll('.add')[2].insertAdjacentHTML('beforebegin', html);
}
</script>
</body>
</html>
