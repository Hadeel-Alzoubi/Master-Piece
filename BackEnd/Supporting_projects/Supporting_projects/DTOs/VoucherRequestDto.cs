using Supporting_projects.Models;

namespace Supporting_projects.DTOs
{
    public class VoucherRequestDto
    {
        public string? Name { get; set; }        // رمز القسيمة

        public decimal? DiscountAmount { get; set; }  // قيمة الخصم
      
        public DateTime ExpiryDate { get; set; }    // تاريخ انتهاء الصلاحية


    }
}
