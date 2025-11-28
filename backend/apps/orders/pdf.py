from django.http import HttpResponse
from django.template.loader import render_to_string
from django.utils import timezone
from weasyprint import HTML
from weasyprint.text.fonts import FontConfiguration

font_config = FontConfiguration()
css = """
@font-face {
    font-family: 'Vazirmatn';
    src: url('/static/fonts/Vazirmatn-Regular.ttf') format('truetype');
}
body { font-family: 'Vazirmatn', sans-serif; direction: rtl; }
"""

def generate_order_receipt(order):
    html_string = render_to_string('pdf/order_receipt.html', {
        'order': order,
        'now': timezone.now(),
    })
    html = HTML(string=html_string)
    pdf = html.write_pdf(stylesheets=[css], font_config=font_config)
    response = HttpResponse(pdf, content_type='application/pdf')
    response['Content-Disposition'] = f'attachment; filename="Receipt_{order.id}.pdf"'
    return response