# apps/tickets/pdf.py
from django.http import HttpResponse
from django.template.loader import render_to_string
from django.utils import timezone
from weasyprint import HTML
import os

from weasyprint.text.fonts import FontConfiguration

font_config = FontConfiguration()
css = """
@font-face {
    font-family: 'Vazirmatn';
    src: url('/static/fonts/Vazirmatn-Regular.ttf') format('truetype');
}
body { font-family: 'Vazirmatn', sans-serif; direction: rtl; }
"""

def generate_ticket_pdf(ticket):
    html_string = render_to_string('pdf/ticket.html', {
        'ticket': ticket,
        'messages': ticket.messages.all(),
        'now': timezone.now(),
    })
    html = HTML(string=html_string, base_url=os.path.dirname(os.path.abspath(__file__)))
    pdf = html.write_pdf(stylesheets=[css], font_config=font_config)
    response = HttpResponse(pdf, content_type='application/pdf')
    response['Content-Disposition'] = f'attachment; filename="Ticket_{ticket.ticket_id}.pdf"'
    return response