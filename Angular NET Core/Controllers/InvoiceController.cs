using DB;
using GreenMaterialBackEnd.Enumerables;
using Microsoft.AspNetCore.Mvc;

namespace GreenMaterialBackEnd.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class InvoiceController : ControllerBase
    {
        private readonly GreenMaterialContext _context;

        public InvoiceController(GreenMaterialContext context) { _context = context; }

        [HttpGet]
        public ActionResult GetInvoices()
        {
            try
            {
                return Ok(_context.invoices.ToList());
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("ByUser")]
        public ActionResult GetInvoicesByUser(int userId)
        {
            try
            {
                var list = _context.invoices
                    .Where(x => x.user.id == userId)
                    .AsEnumerable()
                    .Select(x => new
                    {
                        x.id,
                        Estado = Enum.GetName(typeof(StateEnum), x.state),
                        EsActual = x.isCurrent ? "Si" : "No",
                        Total = GetTotalAmountByInvoiceId(x)
                    }).ToList();

                return Ok(list);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPost]
        public ActionResult<Invoice> PostInvoice(int userId)
        {
            try
            {
                var currentCreateInvoice = _context.invoices.FirstOrDefault(
                    x => x.isCurrent &&
                    x.userId == userId && (
                    x.state == (int)StateEnum.Carrito ||
                    x.state == (int)StateEnum.Envio ||
                    x.state == (int)StateEnum.Pago
                    ));

                if (currentCreateInvoice != null)
                {
                    return Ok(currentCreateInvoice.id);
                }

                var invoice = new Invoice()
                {
                    userId = userId,
                    state = (int)StateEnum.Carrito,
                    isCurrent = true
                };

                _context.invoices.Add(invoice);

                _context.SaveChanges();

                return Ok(invoice.id);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPost("AddItem")]
        public ActionResult AddItem(int invoiceId, int productId, int cantidad)
        {
            try
            {
                var itemWithProduct = _context.items.FirstOrDefault(x => x.invoiceId == invoiceId && x.productId == productId);

                if (itemWithProduct != null)
                {
                    itemWithProduct.cantidad += cantidad;
                }
                else
                {
                    var item = new Item()
                    {
                        cantidad = cantidad,
                        productId = productId,
                        invoiceId = invoiceId
                    };

                    _context.items.Add(item);
                }

                _context.SaveChanges();

                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPut("ChangeState")]
        public ActionResult ChangeState(int userId, int nextState)
        {
            try
            {
                var lastInvoice = _context.invoices.FirstOrDefault(
                    x => x.isCurrent &&
                    x.userId == userId);

                if (lastInvoice == null)
                {
                    return Ok();
                }

                lastInvoice.state = nextState;

                _context.SaveChanges();

                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPut("ChangeStateByInvoiceId")]
        public ActionResult ChangeStateByInvoiceId(int invoiceId, int nextState)
        {
            try
            {
                var invoice = _context.invoices.FirstOrDefault(x => x.id == invoiceId);

                if (invoice == null)
                {
                    return Ok();
                }

                invoice.state = nextState;

                _context.SaveChanges();

                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        private decimal GetTotalAmountByInvoiceId(Invoice invoice)
        {
            try
            {
                return _context.items
                    .Where(x => x.invoiceId == invoice.id)
                    .Join(
                        _context.products,
                        item => item.productId,
                        product => product.id,
                        (item, product) => item.cantidad * product.price
                    )
                    .Sum();
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }

        [HttpGet("GetTotalAmountByUserId")]
        public ActionResult<decimal> GetTotalAmountByUserId(int userId)
        {
            try
            {
                var invoice = _context.invoices.FirstOrDefault(
                    x => x.userId == userId && 
                    x.isCurrent) ?? throw new Exception("El usuario no tiene pedido en curso");

                var totalSum = GetTotalAmountByInvoiceId(invoice);

                return Ok(totalSum);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("HasInvoiceByStateAndUser")]
        public ActionResult<int> HasInvoiceByStateAndUser(int userId)
        {
            try
            {
                var lastInvoice = _context.invoices.FirstOrDefault(
                    x => x.isCurrent &&
                         x.userId == userId && (
                         x.state == (int)StateEnum.Carrito ||
                         x.state == (int)StateEnum.Envio ||
                         x.state == (int)StateEnum.Pago));

                return lastInvoice == null ? Ok((int)StateEnum.Inexistente) : Ok(lastInvoice.state);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpDelete()]
        public ActionResult DeleteItem(int invoiceId)
        {
            try
            {
                var invoice = _context.invoices.FirstOrDefault(x => x.id == invoiceId);

                invoice.state = (int)StateEnum.Eliminado;

                if (invoice.isCurrent)
                {
                    invoice.isCurrent = false;
                }

                _context.SaveChanges();

                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
